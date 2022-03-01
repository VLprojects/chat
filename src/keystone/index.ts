import { computed } from 'mobx';
import { model, Model, onSnapshot, prop, registerRootStore } from 'mobx-keystone';
import { createContext, useContext } from 'react';
import Auth from './auth';
import Chat from './chat';
import Settings from './settings';
import SocketStore from './socket';
import UI from './ui';

@model('Root')
export class Root extends Model({
  chat: prop<Chat>(() => new Chat({})),
  auth: prop<Auth>(() => new Auth({})),
  socket: prop<SocketStore>(() => new SocketStore({})),
  ui: prop<UI>(() => new UI({})),
  settings: prop<Settings>(() => new Settings({})),
}) {
  @computed
  get currentChannel() {
    return this.chat.channels.get(this.ui.params.id as string);
  }
}

export const createRootStore = (): Root => {
  const store = new Root({});
  registerRootStore(store);

  return store;
};

const rootStore = createRootStore();
const context = createContext(rootStore);
const useKeystone = (): Root => useContext(context);

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-console
  onSnapshot(rootStore, (newSnapshot) => console.log('snapshot', newSnapshot));
}

export default useKeystone;
