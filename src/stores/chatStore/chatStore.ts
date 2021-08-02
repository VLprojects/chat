import { action, makeAutoObservable, observable } from 'mobx';
import { chunkProcessor, IDisposer } from 'mobx-utils';
import Routes from 'routes';
import { IUser } from 'stores/profileStore/types';
import api from '../../api';
import { RootStore } from '../rootStore';
import { IGetInitialResponse } from './types';

class ChatStore {
  rootStore: RootStore;

  @observable username: string;

  @observable channelId: string | null;

  @observable route: string;

  @observable params: Record<string, unknown> = {};

  @observable isAnonymousAllowed = false;

  @observable isDirectAllowed = false;

  @observable isCreateChannelAllowed = false;

  // stores all known to particular frontend client users
  // todo consider refactoring to Map
  @observable users: IUser[] = [];

  @observable fetchingQueueUser: number[] = [];

  error?: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.username = '';

    this.channelId = null;

    this.route = '';

    makeAutoObservable(this);
  }

  public startFetching(): IDisposer {
    const fetchUsers = async (ids: number[]) => {
      const newUsers = (await api.post('users/fetch', { ids })) as IUser[];
      console.log('new users', newUsers);
      this.setUsers([...this.users, ...newUsers]);
      this.setFetchingQueueUser([]);
    };

    return chunkProcessor(
      this.fetchingQueueUser,
      (chunk) => {
        console.log('processing chunk', chunk);
        fetchUsers(chunk);
      },
      1000,
      100,
    );
  }

  @action setFetchingQueueUser(queue: number[]): void {
    this.fetchingQueueUser = queue;
  }

  @action setUsername(username: string): void {
    this.username = username;
  }

  @action setChannelId(channelId: string | null): void {
    this.channelId = channelId;
  }

  @action setRoute(route: string): void {
    this.route = route;
  }

  @action setParams(params: Record<string, unknown>): void {
    this.params = params;
  }

  @action setUsers(users: IUser[]): void {
    this.users = users;
  }

  @action redirectToInitial(): void {
    if (!this.channelId) {
      this.setRoute(Routes.Channels);
    }
  }

  getUsers(ids: number[] = []): IUser[] {
    if (ids.length === 0) {
      return this.users;
    }

    const result: IUser[] = [];
    ids.forEach((item) => {
      const found = this.users.find(({ id }) => item === id);
      if (found) {
        result.push(found);
      } else {
        this.fetchingQueueUser.push(item);
      }
    });

    return result;
  }

  async getInitial(): Promise<void> {
    const { profileStore, channelsStore } = this.rootStore;
    try {
      const response = (await api.get(`get-initial`)) as IGetInitialResponse;
      const { channels, publics, user, users } = response;
      channelsStore.setChannels(channels);
      channelsStore.setPublics(publics);
      profileStore.setProfile(user);
      this.setUsers(users);
      this.startFetching();
      if (this.channelId) {
        channelsStore.joinChannelByExternalId(this.channelId);
      }
    } catch (e) {
      this.error = JSON.stringify(e);
    }
  }
}

export default ChatStore;
