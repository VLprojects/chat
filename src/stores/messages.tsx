import { action, makeAutoObservable, observable } from 'mobx';
import { RootStore } from './root';

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
    const { apiBaseUrl } = this.rootStore.chatStore;
    this.messageSendError = '';
    const accessToken = this.rootStore.authStore.accessToken || '';
    try {
      await fetch(
        `${apiBaseUrl}/messages/send`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ channelId, text }),
        },
      );
    } catch (e) {
      this.messageSendError = JSON.stringify(e);
    }
  }
}

export default MessagesStore;
