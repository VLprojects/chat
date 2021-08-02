import { action, makeAutoObservable, observable } from 'mobx';
import Routes from 'routes';
import chatStore from '.';
import api from '../../api';
import { IUser } from '../profileStore/types';
import { RootStore } from '../rootStore';
import { IGetInitialResponse } from './types';

class ChatStore {
  rootStore: RootStore;

  @observable users: IUser[];

  @observable username: string;

  @observable channelId: string | null;

  @observable route: string;

  @observable params: Record<string, unknown> = {};

  @observable isAnonymousAllowed = false;

  @observable isDirectAllowed = false;

  @observable isCreateChannelAllowed = false;

  error?: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.users = [];

    this.username = '';

    this.channelId = null;

    this.route = '';

    makeAutoObservable(this);
  }

  @action setUsername(username: string): void {
    this.username = username;
  }

  @action setChannelId(channelId: string | null): void {
    this.channelId = channelId;
  }

  @action setRoute(route: string): void {
    this.route = route;
  }

  @action setParams(params: Record<string, unknown>): void {
    this.params = params;
  }

  @action redirectToInitial(): void {
    if (!this.channelId) {
      this.setRoute(Routes.Channels);
    }
  }

  async getInitial(): Promise<void> {
    const { profileStore, channelsStore } = this.rootStore;
    const { apiToken } = this.rootStore.authStore;
    try {
      const response = (await api.get(`get-initial/${apiToken || ''}`)) as IGetInitialResponse;
      const { channels, publics, user, users } = response;
      channelsStore.setChannels(channels);
      channelsStore.setPublics(publics);
      profileStore.setProfile(user);
      if (this.channelId) {
        channelsStore.joinChannelByExternalId(this.channelId);
      }

      this.users = users;
    } catch (e) {
      this.error = JSON.stringify(e);
    }
  }
}

export default ChatStore;
