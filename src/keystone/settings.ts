import { model, Model, modelAction, prop } from 'mobx-keystone';
import { computed } from 'mobx';
import { AuthModeEnum } from 'types/enums';

@model('Settings')
export default class Settings extends Model({
  createChannelAllowed: prop<boolean>(false).withSetter(),
  accessUnregisteredUsers: prop<boolean>(false).withSetter(),
  accessChatGuest: prop<boolean>(false).withSetter(),
  accessRegister: prop<boolean>(false).withSetter(),
  displayDirect: prop<boolean>(false).withSetter(),
  displayUserList: prop<boolean>(false).withSetter(),
  displayChannelList: prop<boolean>(false).withSetter(),
  displaySystemMessages: prop<boolean>(false).withSetter(),
  displayHeader: prop<boolean>(false).withSetter(),
  socketUrl: prop<string>('').withSetter(),
}) {
  @modelAction
  setAll({
    createChannelAllowed = false,
    accessUnregisteredUsers = false,
    accessChatGuest = false,
    accessRegister = false,
    displayDirect = false,
    displayUserList = false,
    displayChannelList = false,
    displaySystemMessages = false,
    displayHeader = false,
    socketUrl,
  }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<string, any>): void {
    this.createChannelAllowed = createChannelAllowed;
    this.accessRegister = accessRegister;
    this.accessChatGuest = accessChatGuest;
    this.accessUnregisteredUsers = accessUnregisteredUsers;
    this.displayDirect = displayDirect;
    this.displayUserList = displayUserList;
    this.displayChannelList = displayChannelList;
    this.displaySystemMessages = displaySystemMessages;
    this.displayHeader = displayHeader;
    this.socketUrl = socketUrl;
  }

  @computed
  get authMode(): number {
    const modeTree = {
      0: {
        // accessRegister === false
        0: {
          // accessUnregisteredUsers === false
          0: AuthModeEnum.Mode1,
          1: AuthModeEnum.Mode2, // accessChatGuest === true
        },
        1: {
          // accessUnregisteredUsers === true
          0: AuthModeEnum.Mode3,
          1: AuthModeEnum.Mode4, // accessChatGuest === true
        },
      },
      1: {
        // accessRegister === true
        0: {
          // accessUnregisteredUsers === false
          0: AuthModeEnum.Mode5,
          1: AuthModeEnum.Mode6, // accessChatGuest === true
        },
        1: {
          // accessUnregisteredUsers === true
          0: AuthModeEnum.Mode7,
          1: AuthModeEnum.Mode8, // accessChatGuest === true
        },
      },
    };

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return modeTree[+this.accessRegister][+this.accessUnregisteredUsers][+this.accessChatGuest];
  }
}
