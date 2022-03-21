import { computed } from 'mobx';
import {
  isRootStore,
  model,
  Model,
  modelAction,
  onSnapshot,
  prop,
  registerRootStore,
  unregisterRootStore,
} from 'mobx-keystone';
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

  @modelAction
  init() {
    if (isRootStore(this)) {
      unregisterRootStore(this);
    }
    this.chat = new Chat({});
    this.auth = new Auth({});
    this.socket = new SocketStore({});
    this.ui = new UI({});
    this.settings = new Settings({});
    registerRootStore(this);
  }
}

const rootStore = new Root({});
const context = createContext(rootStore);
const useKeystone = (): Root => useContext(context);

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-console
  onSnapshot(rootStore, (newSnapshot) => console.log('snapshot', newSnapshot));
}

export default useKeystone;
