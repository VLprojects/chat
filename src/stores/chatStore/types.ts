import { ChannelTypeEnum } from '../channelsStore';
import { MessageTypeEnum } from '../messagesStore';
import { IUser } from '../profileStore/types';

export type IChannelPublic = {
  id: number;
  name: string;
  externalId: string;
};

export interface IChannelMessage {
  id: number;
  text: string;
  type: MessageTypeEnum;
  userId: number;
}

export interface IChannel {
  id: number;
  name: string;
  type: ChannelTypeEnum;
  userIds: number[];
  messages: IChannelMessage[];
}
export interface IGetInitialResponse {
  channels: IChannel[];
  publics: IChannelPublic[];
  user: IUser;
  users: IUser[];
}
