import { Model, model, prop, rootRef } from 'mobx-keystone';
import { AvatarColorEnum } from 'theme/consts';
import { UserRoleEnum } from '../../types/enums';

const randomEnumKey = <T>(enumeration: T) => {
  const keys = Object.keys(enumeration).filter((k) => !(Math.abs(Number.parseInt(k, 2)) + 1));
  return keys[Math.floor(Math.random() * keys.length)] as keyof typeof AvatarColorEnum;
};

@model('User')
export default class User extends Model({
  id: prop<string>(''),
  username: prop<string>(() => ''),
  displayName: prop<string>(() => ''),
  avatarUrl: prop<string>(() => ''),
  avatarColor: prop<AvatarColorEnum>(() => AvatarColorEnum[randomEnumKey(AvatarColorEnum)]),
  role: prop<UserRoleEnum>(() => UserRoleEnum.User),
}) {}

export const userRef = rootRef<User>('User', {
  getId(maybeUser) {
    return maybeUser instanceof User ? maybeUser.id : undefined;
  },
});
