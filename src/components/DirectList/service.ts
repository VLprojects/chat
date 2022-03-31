import { GET } from 'api';
import { Root } from 'keystone';
import User from 'keystone/chat/user';
import Sentry from 'sentry';
import { IRChannel } from 'types/serverResponses';

export const getDirectsList = async (root: Root) => {
  try {
    const directs = (await GET('channels/directs')) as IRChannel[];
    root.chat.addChannels(directs);
  } catch (e) {
    Sentry.captureException(e);
  }
};

export const getDirectChannelName = (root: Root, channelId: string): string => {
  const ch = root.chat.channels.get(channelId);

  const meId = root.auth.me.id;

  const chatWithUser = ch?.directUsersOnly.find((u) => +u.id !== +meId);

  return chatWithUser?.displayName || chatWithUser?.username || '';
};

export const getDirectChannelList = (root: Root): string[] =>
  root.chat.directChannelsList.map((ch) => getDirectChannelName(root, ch.id));

export const getChatWithUser = (root: Root, channelId: string): User | undefined => {
  const ch = root.chat.channels.get(channelId);
  const meId = root.auth.me.id;

  return ch?.directUsersOnly.find((u) => +u.id !== +meId);
};
