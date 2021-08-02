import { action, makeAutoObservable, runInAction } from 'mobx';
import { io, Socket } from 'socket.io-client';
import api from '../../api';
import { RootStore } from '../rootStore';
import { IGetNodeResponse } from './types';

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

  @action async connectToSocketServer(): Promise<void> {
    const accessToken = this.rootStore.authStore.accessToken || '';
    const { chatStore } = this.rootStore;
    try {
      const response = (await api.get(`get-node`)) as IGetNodeResponse;
      if (response.uri) {
        const { uri } = response;
        this.nodeAddress = uri;

        const socket = io(uri, {
          auth: {
            token: accessToken,
          },
        });

        socket.on('connect', () => {
          runInAction(() => {
            this.socket = socket;
            this.isSocketConnected = true;

            chatStore.getInitial().then(() => {
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
      this.error = e.message;
    }
  }
}

export default SocketStore;
