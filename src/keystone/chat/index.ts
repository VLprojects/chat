import api from 'api';
import { computed, observable } from 'mobx';
import { model, Model, modelAction, objectMap, prop } from 'mobx-keystone';
import { chunkProcessor, IDisposer } from 'mobx-utils';
import { ChannelTypeEnum } from '../../types/enums';
import { IRChannel, IRPub, IRUser } from '../../types/serverResponses';
import Channel from './channel';
import Pub from './pub';
import User from './user';

@model('Chat')
export default class Chat extends Model({
  channels: prop(() => objectMap<Channel>()),
  pubs: prop(() => objectMap<Pub>()),
  users: prop(() => objectMap<User>()), // repository
}) {
  @observable fetchingQueueUser: string[] = [];

  private startFetching(): IDisposer {
    const fetchUsers = async (ids: string[]) => {
      const newUsers = (await api.post('users/fetch', { ids })) as IRUser[];
      this.addUsers(newUsers);
    };

    return chunkProcessor(
      this.fetchingQueueUser,
      (chunk) => {
        fetchUsers(chunk);
      },
      100, // ms
      100, // size
    );
  }

  onAttachedToRootStore(): () => void {
    const disposer = this.startFetching();
    return () => disposer();
  }

  @computed
  get userList(): User[] {
    return Array.from(this.users.values());
  }

  @computed
  get channelsList(): Channel[] {
    return Array.from(this.channels.values());
  }

  @computed
  get publicChannelsList(): Channel[] {
    return Array.from(this.channels.values()).filter((ch) =>
      [ChannelTypeEnum.Public, ChannelTypeEnum.Blank].includes(ch.type),
    );
  }

  @computed
  get directChannelsList(): Channel[] {
    return Array.from(this.channels.values()).filter((ch) => ch.type === ChannelTypeEnum.Direct);
  }

  @computed
  get pubsList(): Pub[] {
    return Array.from(this.pubs.values());
  }

  @modelAction
  getUserLazy(id: string): User {
    const found = this.users.get(id);
    if (found) {
      return found;
    }

    const loadingUser = new User({
      id: String(id),
      displayName: 'Loading...',
    });
    this.fetchingQueueUser.push(id);
    this.users.set(id, loadingUser);

    return loadingUser;
  }

  @modelAction
  updateUser(payload: { userId: number; name: string }): void {
    const { userId, name } = payload;
    const user = this.users.get(`${userId}`);
    if (user) user.displayName = name;
  }

  @modelAction
  addUsers(users: IRUser[]): void {
    users.forEach((user) => {
      const userModel = new User({
        id: String(user.id),
        username: user.username,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        role: user.role,
      });

      this.users.set(user.id, userModel);
    });
  }

  @modelAction
  addChannels(channels: IRChannel[]): void {
    channels.forEach((channel) => {
      const channelModel = new Channel({
        id: String(channel.id),
        name: channel.name,
        type: channel.type,
        externalId: channel.externalId,
      });

      this.channels.set(channel.id, channelModel);
      channelModel.addMessages(channel.messages);
      channelModel.addUsers(channel.userIds);
    });
  }

  @modelAction
  addPubs(pubs: IRPub[]): void {
    pubs.forEach((pub: IRPub) => {
      const pubModel = new Pub({
        id: pub.id,
        name: pub.name,
      });

      this.pubs.set(pub.id, pubModel);
    });
  }
}
