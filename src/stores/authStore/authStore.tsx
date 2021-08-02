import { action, makeAutoObservable, observable } from 'mobx';
import { storeAccessToken } from 'utils/auth';
import api from '../../api';
import Routes from '../../routes';
import { RootStore } from '../rootStore';
import { ILoginResponse } from './types';

class AuthStore {
  rootStore: RootStore;

  accessToken?: string;

  apiToken?: string | null;

  @observable isAuthorized = false;

  @observable authError: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.authError = '';

    makeAutoObservable(this);
  }

  @action setToken(token: string): void {
    api.setToken(token);
    this.accessToken = token;
    this.isAuthorized = true;
    storeAccessToken(token);
    this.rootStore.chatStore.redirectToInitial();
  }

  @action async login(username: string, password?: string): Promise<void> {
    try {
      const response = (await api.post(`/${Routes.Login}`, {
        api_token: this.apiToken,
        username,
        password,
      })) as ILoginResponse;
      this.setToken(response.access_token);
    } catch (e) {
      this.authError = e.message;
    }
  }

  @action async signup(username: string, password?: string): Promise<void> {
    try {
      const response = (await api.post(`/${Routes.Signup}`, {
        api_token: this.apiToken,
        username,
        password,
      })) as ILoginResponse;
      this.setToken(response.access_token);
    } catch (e) {
      this.authError = e.message;
    }
  }

  @action setApiToken(token: string | null): void {
    this.apiToken = token;
  }
}

export default AuthStore;
