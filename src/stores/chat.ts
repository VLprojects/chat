import { action, makeAutoObservable, observable } from 'mobx';
import { TUser } from 'types/users';
import { RootStore } from './root';

class ChatStore {
  rootStore: RootStore;

  @observable users: TUser[];

  @observable apiToken: string;

  @observable apiBaseUrl: string;

  @observable username: string;

  @observable channelId: number | null;

  @observable route: string;

  error?: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.users = [];
    this.apiToken = '';
    this.apiBaseUrl = process.env.REACT_APP_API_BASEURL || 'http://localhost:3001/api';
    this.username = '';
    this.channelId = null;
    this.route = '';

    makeAutoObservable(this);
  }

  @action setApiToken(token: string): void {
    this.apiToken = token;
  }

  @action setApiBaseUrl(url: string): void {
    this.apiBaseUrl = url;
  }

  @action setUsername(username: string): void {
    this.username = username;
  }

  @action setChannelId(channelId: number | null): void {
    this.channelId = channelId;
  }

  @action setRoute(route: string): void {
    this.route = route;
  }

  // eslint-disable-next-line
  async getInitial(): Promise<void> {
    const accessToken = this.rootStore.authStore.accessToken || '';
    const response = await fetch(`${this.apiBaseUrl}/get-initial`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      try {
        const { channels, publics, user, users } = await response.json();
        const { profileStore, channelsStore } = this.rootStore;
        channelsStore.setChannels(channels);
        channelsStore.setPublics(publics);
        profileStore.setProfile(user);
        this.users = users;
      } catch (e) {
        this.error = JSON.stringify(e);
      }
    }
  }
}

export default ChatStore;
