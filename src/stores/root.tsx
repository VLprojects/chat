import React from 'react';
import AuthStore from './auth';
import ChannelsStore from './channels';
import ChatStore from './chat';
import MessagesStore from './messages';
import ProfileStore from './profile';
import SocketStore from './socket';

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
    this.authStore = new AuthStore(this);
    this.chatStore = new ChatStore(this);
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
