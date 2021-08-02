import { action, computed, makeAutoObservable, observable } from 'mobx';
import Routes from 'routes';
import api from '../api';
import { IChannel, IChannelMessage, IChannelPublic } from './chatStore/types';
import { RootStore } from './rootStore';

export enum ChannelTypeEnum {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

class ChannelsStore {
  rootStore: RootStore;

  @observable channels: IChannel[];

  @observable publics: IChannelPublic[];

  @observable direct: [];

  @observable messages: [];

  @observable channelsError?: string;

  @observable isChannelCreated: boolean | null;

  @observable channelCreatedError: string;

  @observable channelJoinedError: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.channels = [];
    this.publics = [];
    this.direct = [];
    this.messages = [];
    this.channelsError = '';
    this.isChannelCreated = null;
    this.channelCreatedError = '';
    this.channelJoinedError = '';

    makeAutoObservable(this);
  }

  @action addMessage(channelId: number, message: IChannelMessage): void {
    const channel = this.channels.find((item: IChannel) => item.id === channelId);
    if (channel) {
      channel.messages.push(message);
    }
  }

  getChannel(channelId: number): IChannel | undefined {
    return this.channels?.find((item: IChannel) => item.id === Number(channelId));
  }

  @computed getSortedMessages(channelId: number): IChannelMessage[] | undefined {
    return this.getChannel(channelId)
      ?.messages.slice()
      .sort((a, b) => a.id - b.id);
  }

  @action setChannels(channels: IChannel[]): void {
    this.channels = channels;
  }

  @action addChannel(newChannel: IChannel): void {
    this.channels = [...this.channels, newChannel];
  }

  @action setPublics(publics: IChannelPublic[]): void {
    this.publics = publics;
  }

  @action clearChannelCreated(): void {
    this.isChannelCreated = null;
  }

  @action.bound async joinChannel(id: number): Promise<void> {
    const response = (await api.post(`channels/join`, { id })) as IChannel;
    this.setPublics(this.publics.filter((item: IChannelPublic) => item.id !== response.id));
    this.setChannels([...this.channels, response]);
    this.rootStore.chatStore.setRoute(`${Routes.Channels}/${response.id}`);
  }

  // todo refactor both join actions
  @action.bound async joinChannelByExternalId(externalId: string): Promise<void> {
    const alreadyJoined = this.publics.find((item) => item.externalId === externalId);
    if (alreadyJoined) {
      this.rootStore.chatStore.setRoute(`${Routes.Channels}/${alreadyJoined.id}`);
    } else {
      const response = (await api.post(`channels/join-external/${externalId}`)) as IChannel;
      this.setPublics(this.publics.filter((item: IChannelPublic) => item.id !== response.id));
      this.setChannels([...this.channels, response]);
      this.rootStore.chatStore.setRoute(`${Routes.Channels}/${response.id}`);
    }
  }

  @action async createChannel(name: string, type: ChannelTypeEnum = ChannelTypeEnum.PUBLIC): Promise<void> {
    this.isChannelCreated = null;
    this.channelCreatedError = '';
    try {
      await api.post(`channels/create`, { name, type });
      this.isChannelCreated = true;
    } catch (e) {
      this.channelCreatedError = e.message;
      this.isChannelCreated = false;
    }
  }
}

export default ChannelsStore;
