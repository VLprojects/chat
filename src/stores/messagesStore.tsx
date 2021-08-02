import { action, makeAutoObservable, observable } from 'mobx';
import api from '../api';
import { RootStore } from './rootStore';

export enum MessageTypeEnum {
  System = 'system',
}

class MessagesStore {
  rootStore: RootStore;

  @observable messages: [];

  @observable messageSendError: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.messages = [];
    this.messageSendError = '';
    makeAutoObservable(this);
  }

  @action async sendMessage(channelId: number, text?: string): Promise<void> {
    this.messageSendError = '';

    try {
      await api.post(`messages/send`, { channelId, text });
    } catch (e) {
      this.messageSendError = JSON.stringify(e);
    }
  }
}

export default MessagesStore;
