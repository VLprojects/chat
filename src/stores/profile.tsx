import { action, makeAutoObservable, observable } from 'mobx';

import { TUser } from 'types/users';

import Routes from '../routes';
import { RootStore } from './root';

class ProfileStore {
  rootStore: RootStore;

  @observable user: TUser | null;

  @observable profileError?: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.user = null;

    makeAutoObservable(this);
  }

  @action clearError(): void {
    this.profileError = '';
  }

  // @action async getProfile(): Promise<void> {
  //   const accessToken = this.rootStore.authStore.accessToken || '';
  //   const response = await fetch(
  //     `${process.env.REACT_APP_API_BASEURL || ''}/profile`,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     },
  //   );

  //   if (response.ok) {
  //     try {
  //       const { username, avatar } = await response.json();
  //       this.username = username;
  //       this.avatar = avatar;
  //     } catch (e) {
  //       this.profileError = JSON.stringify(e);
  //     }
  //   }
  // }

  @action setProfile(user: TUser): void {
    this.user = user;
  }

  @action async saveProfile(username: string, avatar?: string): Promise<void> {
    const { apiBaseUrl } = this.rootStore.chatStore;
    const accessToken = this.rootStore.authStore.accessToken || '';

    const sendData: {
      username?: string;
      avatarUrl?: string;
    } = {};
    if (username) {
      sendData.username = username;
    }
    if (avatar) {
      sendData.avatarUrl = avatar;
    }

    const response = await fetch(`${apiBaseUrl}/${Routes.Profile}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(sendData),
    });

    if (response.ok) {
      try {
        await response.json();
        this.profileError = '';
      } catch (e) {
        this.profileError = JSON.stringify(e);
      }
    } else {
      const { messsage } = await response.json();
      this.profileError = messsage;
    }
  }
}

export default ProfileStore;
