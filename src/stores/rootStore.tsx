import React from 'react';
import AuthStore from './authStore';
import ChannelsStore from './channelsStore';
import ChatStore from './chatStore';
import MessagesStore from './messagesStore';
import ProfileStore from './profileStore';
import SocketStore from './socketStore';

type TRootStore = {
  authStore: AuthStore;
  chatStore: ChatStore;
  profileStore: ProfileStore;
  channelsStore: ChannelsStore;
  messagesStore: MessagesStore;
  socketStore: SocketStore;
};

export class RootStore {
  authStore: AuthStore;

  chatStore: ChatStore;

  profileStore: ProfileStore;

  channelsStore: ChannelsStore;

  messagesStore: MessagesStore;

  socketStore: SocketStore;

  constructor() {
    this.chatStore = new ChatStore(this);
    this.authStore = new AuthStore(this);
    this.profileStore = new ProfileStore(this);
    this.channelsStore = new ChannelsStore(this);
    this.messagesStore = new MessagesStore(this);
    this.socketStore = new SocketStore(this);
  }

  getStores(): TRootStore {
    return {
      authStore: this.authStore,
      chatStore: this.chatStore,
      profileStore: this.profileStore,
      channelsStore: this.channelsStore,
      messagesStore: this.messagesStore,
      socketStore: this.socketStore,
    };
  }
}

const rootStore: RootStore = new RootStore();

const storesContext = React.createContext(rootStore.getStores());
const useStores = (): TRootStore => React.useContext(storesContext);

export default useStores;
