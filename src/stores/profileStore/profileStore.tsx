import { action, makeAutoObservable, observable } from 'mobx';
import api from '../../api';
import { RootStore } from '../rootStore';
import { IUser } from './types';

class ProfileStore {
  rootStore: RootStore;

  @observable user: IUser | null;

  @observable profileError?: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.user = null;

    makeAutoObservable(this);
  }

  @action clearError(): void {
    this.profileError = '';
  }

  @action setProfile(user: IUser): void {
    this.user = user;
  }

  @action async saveProfile(username: string, avatar?: string): Promise<void> {
    const sendData: { username?: string; avatarUrl?: string } = {};
    if (username) {
      sendData.username = username;
    }
    if (avatar) {
      sendData.avatarUrl = avatar;
    }
    try {
      await api.patch(`profile`, sendData);
      this.profileError = '';
    } catch (e) {
      this.profileError = e.messsage;
    }
  }
}

export default ProfileStore;
