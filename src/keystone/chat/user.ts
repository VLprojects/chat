import { Model, model, prop, rootRef } from 'mobx-keystone';

@model('User')
export default class User extends Model({
  id: prop<string>(''),
  username: prop<string>(() => ''),
  displayName: prop<string>(() => ''),
  avatarUrl: prop<string>(() => ''),
  role: prop<string>(() => ''),
}) {}

export const userRef = rootRef<User>('User', {
  getId(maybeUser) {
    return maybeUser instanceof User ? maybeUser.id : undefined;
  },
});
