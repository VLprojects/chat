import { computed } from 'mobx';
import { detach, Model, model, prop, rootRef } from 'mobx-keystone';
import { AvatarColorEnum } from 'theme/consts';
import { UserRoleEnum } from '../../types/enums';

export const getColorFromString = (colors: string[], str?: string | null): keyof typeof AvatarColorEnum => {
  if (!str?.length || !colors.length) {
    return colors[0] as keyof typeof AvatarColorEnum;
  }

  const index =
    str.length <= colors.length
      ? str.length - 1
      : str.length % (colors.length * Math.floor(str.length / colors.length));

  return colors[index] as keyof typeof AvatarColorEnum;
};

@model('User')
export default class User extends Model({
  id: prop<string>(''),
  username: prop<string>(() => ''),
  displayName: prop<string>(() => ''),
  avatarUrl: prop<string>(() => ''),
  role: prop<UserRoleEnum>(() => UserRoleEnum.User),
}) {
  @computed
  get getAvatarColor(): AvatarColorEnum {
    const key = getColorFromString(Object.keys(AvatarColorEnum), this.displayName);
    return AvatarColorEnum[key];
  }
}

export const userRef = rootRef<User>('User', {
  getId(maybeUser) {
    return maybeUser instanceof User ? maybeUser.id : undefined;
  },
  onResolvedValueChange(ref, newValue, oldValue) {
    if (oldValue && !newValue) {
      // if the todo value we were referencing disappeared then remove the reference
      // from its parent
      detach(ref)
    }
  },
});
