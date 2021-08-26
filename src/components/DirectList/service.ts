import { Root } from 'keystone/index';
import User from '../../keystone/chat/user';

export const getDirectChannelName = (root: Root, channelId: string): string => {
  const ch = root.chat.channels.get(channelId);
  const meId = root.auth.me.id;

  const chatWithUser = ch?.userList.find((u) => +u.id !== +meId);

  return chatWithUser?.displayName || chatWithUser?.username || '';
};

export const getDirectChannelList = (root: Root): string[] =>
  root.chat.directChannelsList.map((ch) => getDirectChannelName(root, ch.id));

export const getChatWithUser = (root: Root, channelId: string): User | undefined => {
  const ch = root.chat.channels.get(channelId);
  const meId = root.auth.me.id;

  return ch?.userList.find((u) => +u.id !== +meId);
};
