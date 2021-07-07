import { TUser } from './users';
import { TMessage } from './messages';

export type TChannel = {
  id: number,
  messages: TMessage[],
  name: string,
  type: string,
  userIds: number[];
};

export type TDirect = {
  id: number,
  messages: TMessage[],
  name: string,
  type: string,
  users: TUser[],
};

export type TChannelPublics = {
  id: number,
  name: string,
};
