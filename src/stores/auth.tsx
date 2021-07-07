import { action, makeAutoObservable, observable } from 'mobx';

import { storeAccessToken, getStoredAccessToken } from 'utils/auth';

import Routes from '../routes';
import { RootStore } from './root';

class AuthStore {
  rootStore: RootStore;

  accessToken?: string;

  @observable isAuthorized = false;

  @observable authError: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.accessToken = getStoredAccessToken();
    if (this.accessToken) {
      this.isAuthorized = true;
    }

    this.authError = '';

    makeAutoObservable(this);
  }

  @action async login(username: string, password?: string): Promise<void> {
    const { apiToken, apiBaseUrl } = this.rootStore.chatStore;

    if (!apiToken) throw new Error('API_TOKEN from env is empty!');

    const response = await fetch(`${apiBaseUrl}/${Routes.Login}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ api_token: apiToken, username, password }),
    });

    if (response.ok) {
      try {
        const { access_token: accessToken } = await response.json();

        if (accessToken) {
          this.accessToken = accessToken;
          this.isAuthorized = true;
          storeAccessToken(accessToken);
        }
      } catch (e) {
        this.authError = JSON.stringify(e);
      }
    } else {
      const { message } = await response.json();
      this.authError = message;
    }
  }

  @action async signup(username: string, password?: string): Promise<void> {
    const { apiToken, apiBaseUrl } = this.rootStore.chatStore;

    if (!apiToken) throw new Error('API_TOKEN from env is empty!');
    console.log(apiBaseUrl);

    const response = await fetch(`${apiBaseUrl}/${Routes.Signup}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ api_token: apiToken, username, password }),
    });

    if (response.ok) {
      try {
        const { access_token: accessToken } = await response.json();

        if (accessToken) {
          storeAccessToken(accessToken);
          this.accessToken = accessToken;
          this.isAuthorized = true;
        }
      } catch (e) {
        this.authError = JSON.stringify(e);
      }
    } else {
      const { message } = await response.json();
      this.authError = message;
    }
  }
}

export default AuthStore;
