import { IServerPoll } from '../containers/CreatePollPage/types';
import { ChannelTypeEnum, MessageTypeEnum, UserRoleEnum } from './enums';

// IR - Interface of API Response
export interface IRUser {
  id: string;
  avatarUrl: string;
  role: UserRoleEnum;
  username: string;
  displayName: string;
  lang: string | null;
}

export interface IRChannelMessage {
  id: string;
  text: string;
  type: MessageTypeEnum;
  userId: string;
  createdAt: string;
  meta: Record<string, unknown>;
}

// Interface of Socket Event
export interface ISEMessage {
  channelId: string;
  message: IRChannelMessage;
}

export interface IRChannel {
  id: string;
  name: string;
  externalId: string;
  type: ChannelTypeEnum;
  users?: IRUser[]; // directs has users;
  messages: IRChannelMessage[];
  polls: IServerPoll[];
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

export interface IRPinnedMessage {
  id: number;
  channelId: number;
  messageId: number;
  message: IRChannelMessage;
}
