import { action, computed, makeAutoObservable, observable } from 'mobx';

import { TChannel, TChannelPublics } from 'types/channels';
import { TMessage } from 'types/messages';
import { TUser } from 'types/users';

import { RootStore } from './root';

export enum ChannelTypeEnum {
  PUBLIC = 'public',
  PRIVATE = 'private',
}
class ChannelsStore {
  rootStore: RootStore;

  @observable channels: TChannel[];

  @observable publics: TChannelPublics[];

  @observable direct: [];

  @observable users: TUser[];

  @observable messages: [];

  @observable channelsError?: string;

  @observable isChannelCreated: boolean | null;

  @observable channelCreatedError: string;

  @observable isChannelJoined: boolean | null;

  @observable channelJoinedError: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.channels = [];
    this.publics = [];
    this.direct = [];
    this.users = [];
    this.messages = [];
    this.channelsError = '';
    this.isChannelCreated = null;
    this.channelCreatedError = '';
    this.isChannelJoined = null;
    this.channelJoinedError = '';

    makeAutoObservable(this);
  }

  @action addMessage(channelId: number, message: TMessage): void {
    const channel = this.channels.find((item: TChannel) => item.id === channelId);
    if (channel) {
      channel.messages.push(message);
    }
  }

  getChannel(channelId: number): TChannel | undefined {
    return this.channels?.find((item: TChannel) => item.id === Number(channelId));
  }

  @computed getSortedMessages(channelId: number): TMessage[] {
    return (
      this.getChannel(channelId)
        ?.messages.slice()
        .sort((a, b) => a.id - b.id) || []
    );
  }

  @action setChannels(channels: TChannel[]): void {
    this.channels = channels;
  }

  @action addChannel(newChannel: TChannel): void {
    this.channels = [...this.channels, newChannel];
  }

  @action setUsers(users: TUser[]): void {
    this.users = users;
  }

  @action setPublics(publics: TChannelPublics[]): void {
    this.publics = publics;
  }

  @action async getChannels(): Promise<void> {
    const { apiBaseUrl } = this.rootStore.chatStore;
    const accessToken = this.rootStore.authStore.accessToken || '';
    const response = await fetch(`${apiBaseUrl}/channels`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      try {
        const { channels, direct, users, messages } = await response.json();

        this.channels = channels;
        this.direct = direct;
        this.users = users;
        this.messages = messages;
      } catch (e) {
        this.channelsError = JSON.stringify(e);
      }
    }
  }

  @action clearChannelCreated(): void {
    this.isChannelCreated = null;
  }

  @action.bound async joinChannel(id: number): Promise<void> {
    const { apiBaseUrl } = this.rootStore.chatStore;
    const accessToken = this.rootStore.authStore.accessToken || '';

    this.isChannelJoined = null;
    this.channelJoinedError = '';

    const response = await fetch(`${apiBaseUrl}/channels/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      try {
        const data = await response.json();
        this.isChannelJoined = true;

        this.setPublics(this.publics.filter((item: TChannelPublics) => item.id !== data.id));
        this.setChannels([...this.channels, data]);
      } catch (e) {
        this.channelJoinedError = JSON.stringify(e);
        this.isChannelJoined = false;
      }
    } else {
      const { message } = await response.json();
      this.channelJoinedError = message;
      this.isChannelJoined = false;
    }
  }

  @action async createChannel(name: string, type: ChannelTypeEnum = ChannelTypeEnum.PUBLIC): Promise<Response> {
    const { apiBaseUrl } = this.rootStore.chatStore;
    const accessToken = this.rootStore.authStore.accessToken || '';

    this.isChannelCreated = null;
    this.channelCreatedError = '';

    const response = await fetch(`${apiBaseUrl}/channels/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name, type }),
    });

    if (response.ok) {
      try {
        this.isChannelCreated = true;
      } catch (e) {
        this.channelCreatedError = JSON.stringify(e);
        this.isChannelCreated = false;
      }
    } else {
      const { message } = await response.json();
      this.channelCreatedError = message;
      this.isChannelCreated = false;
    }

    return response;
  }
}

export default ChannelsStore;
