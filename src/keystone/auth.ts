import api from 'api';
import { model, Model, modelAction, prop } from 'mobx-keystone';
import { IRUser } from '../types/serverResponses';
import { storeAccessToken } from '../utils/auth';
import User from './chat/user';

@model('Auth')
export default class Auth extends Model({
  me: prop<User>(() => new User({})),
  accessToken: prop<string>(''),
  apiToken: prop<string>('').withSetter(),
  isAuthorized: prop<boolean>(false).withSetter(),
  isAnonymousAllowed: prop<boolean>(false).withSetter(),
}) {
  @modelAction
  setAccessToken(token: string): void {
    api.setToken(token);
    this.accessToken = token;
    this.isAuthorized = true;
    storeAccessToken(token);
  }

  @modelAction
  setMe(user: IRUser): void {
    const userModel = new User({
      id: user.id,
      displayName: user.displayName,
      username: user.username,
      avatarUrl: user.avatarUrl,
      role: user.role,
    });
    
    this.me = userModel;
  }
}
