import { model, Model, modelAction, prop } from 'mobx-keystone';

@model('Settings')
export default class Settings extends Model({
  createChannelAllowed: prop<boolean>(false).withSetter(),
  displayDirect: prop<boolean>(false).withSetter(),
  accessRegister: prop<boolean>(false).withSetter(),
  accessChatGuest: prop<boolean>(false).withSetter(),
  displayUserList: prop<boolean>(false).withSetter(),
  displayChannelList: prop<boolean>(false).withSetter(),
  accessUnregisteredUsers: prop<boolean>(false).withSetter(),
}) {
  @modelAction
  setAll({
    createChannelAllowed = false,
    displayDirect = false,
    accessRegister = false,
    accessChatGuest = false,
    displayUserList = false,
    displayChannelList = false,
    accessUnregisteredUsers = false,
  }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<string, any>): void {
    this.createChannelAllowed = createChannelAllowed;
    this.displayDirect = displayDirect;
    this.accessRegister = accessRegister;
    this.accessChatGuest = accessChatGuest;
    this.displayUserList = displayUserList;
    this.displayChannelList = displayChannelList;
    this.accessUnregisteredUsers = accessUnregisteredUsers;
  }
}
