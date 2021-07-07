import { TUser } from './users';

export type TMessage = {
  createdAt: string,
  id: number,
  text: string,
  userId: number,
  type: string, // todo enum
};
