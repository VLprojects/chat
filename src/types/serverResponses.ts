import { ChannelTypeEnum, MessageTypeEnum } from './enums';

// IR - Interface of API Response
export interface IRUser {
  id: string;
  avatarUrl: string;
  role: string;
  username: string;
  displayName: string;
}

export interface IRChannelMessage {
  id: string;
  text: string;
  type: MessageTypeEnum;
  userId: string;
  createdAt: string;
}

// Interface of Socket Event
export interface ISEMessage {
  channelId: string;
  message: IRChannelMessage;
}

export interface IRChannel {
  id: string;
  name: string;
  type: ChannelTypeEnum;
  userIds: string[];
  messages: IRChannelMessage[];
}

export interface IRPub {
  id: string;
  name: string;
}
export interface IRGetInitial {
  channels: IRChannel[];
  publics: IRPub[];
  user: IRUser;
  users: IRUser[];
  settings: Record<string, unknown>;
}

export interface IRLogin {
  access_token: string;
}

export interface IRGetNode {
  uri: string;
}
