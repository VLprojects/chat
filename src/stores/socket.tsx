import { action, makeAutoObservable, runInAction } from 'mobx';
import { io, Socket } from 'socket.io-client';

import { RootStore } from './root';

enum SocketEventsEnum {
  MESSAGE = 'message',
  SYSTEM_MESSAGE = 'system:message',
  NEW_PUBLIC = 'new-public',
}

class SocketStore {
  rootStore: RootStore;

  socket: Socket | undefined;

  isSocketConnected = false;

  nodeAddress?: string;

  error?: string;

  inited = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @action.bound async connectToSocketServer(): Promise<void> {
    const { apiBaseUrl } = this.rootStore.chatStore;
    const accessToken = this.rootStore.authStore.accessToken || '';
    const response = await fetch(`${apiBaseUrl}/get-node`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      try {
        const { uri } = await response.json();

        if (uri) {
          this.nodeAddress = uri;

          const socket = io(uri, {
            auth: {
              token: this.rootStore.authStore.accessToken,
            },
          });

          socket.on('connect', () => {
            runInAction(() => {
              this.socket = socket;
              this.isSocketConnected = true;

              this.rootStore.chatStore.getInitial().then(() => {
                this.inited = true;
              });
            });
          });

          socket.on(SocketEventsEnum.MESSAGE, (data) => {
            const { channelId, message } = data;
            this.rootStore.channelsStore.addMessage(channelId, { ...message, isNew: true });
          });

          socket.on(SocketEventsEnum.SYSTEM_MESSAGE, (data) => {
            const { channelId, message } = data;
            this.rootStore.channelsStore.addMessage(channelId, { ...message, isNew: true });
          });
          socket.on(SocketEventsEnum.NEW_PUBLIC, (data) => {
            this.rootStore.channelsStore.addChannel({ ...data, messages: [] });
          });
        }
      } catch (e) {
        this.error = JSON.stringify(e);
      }
    }
  }
}

export default SocketStore;
