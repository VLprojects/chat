import { setToken } from 'api';
import { model, Model, modelAction, prop } from 'mobx-keystone';
import { computed } from 'mobx';
import { IRUser } from '../types/serverResponses';
import { storeAccessToken } from '../utils/auth';
import User from './chat/user';
import { UserRoleEnum } from '../types/enums';

@model('Auth')
export default class Auth extends Model({
  me: prop<User>(() => new User({})),
  accessToken: prop<string>(''),
  appId: prop<string>('').withSetter(),
  isAuthorized: prop<boolean>(false).withSetter(),
  isAnonymousAllowed: prop<boolean>(false).withSetter(),
}) {
  @modelAction
  setAccessToken(token: string): void {
    setToken(token);
    this.accessToken = token;
    this.isAuthorized = true;
    storeAccessToken(token);
  }

  @computed
  get isModerator(): boolean {
    return this.me.role === UserRoleEnum.Moderator;
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
