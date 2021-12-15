import { computed } from 'mobx';
import { model, Model, modelAction, prop, Ref } from 'mobx-keystone';
import { MessageTypeEnum } from '../../types/enums';
import User, { userRef } from './user';
import { Root } from '../index';

export enum SystemMessageEnum {
  UserJoinedEvent = 'user-joined',
  UserChangedEvent = 'user-changed',
  UserChangedChannelEvent = 'user-changed-channel',
  ChangedChannelEvent = 'changed-channel',
}

export interface SystemData {
  event: SystemMessageEnum;
  whoJoined?: Ref<User>;
  whoRenamedChannel?: Ref<User>;
  oldDisplayName?: string;
  newDisplayName?: string;
  newName?: string;
}

export interface UserJoinedPayload {
  userId: string;
}

export interface UserChangedPayload {
  oldDisplayName: string;
  newDisplayName: string;
}

export interface UserChangedChannelPayload {
  userId: string;
  newName: string;
}

export interface ChangedChannelEventPayload {
  newName: string;
}

@model('Message')
export default class Message extends Model({
  id: prop<string>(),
  text: prop<string>(),
  type: prop<MessageTypeEnum>(),
  user: prop<Ref<User> | null>(),
  createdAt: prop<string>(),
  meta: prop<Record<string, unknown>>(),
  systemData: prop<SystemData | null>(),
}) {
  @computed
  get getUser(): User | undefined {
    return this.user?.current;
  }

  @modelAction
  loadSystemData(root: Root, event: SystemMessageEnum, data: unknown): void {
    this.systemData = { event };
    switch (event) {
      case SystemMessageEnum.UserJoinedEvent: {
        const { userId } = data as UserJoinedPayload;
        this.systemData.whoJoined = userRef(root.chat.getUserLazy(userId));
        break;
      }
      case SystemMessageEnum.UserChangedEvent: {
        const { oldDisplayName, newDisplayName } = data as UserChangedPayload;
        this.systemData.oldDisplayName = oldDisplayName;
        this.systemData.newDisplayName = newDisplayName;
        break;
      }
      case SystemMessageEnum.UserChangedChannelEvent: {
        const { userId, newName } = data as UserChangedChannelPayload;
        this.systemData.whoRenamedChannel = userRef(root.chat.getUserLazy(userId));
        this.systemData.newName = newName;
        break;
      }
      case SystemMessageEnum.ChangedChannelEvent: {
        const { newName } = data as ChangedChannelEventPayload;
        this.systemData.newName = newName;
        break;
      }
      default:
    }
  }
}
