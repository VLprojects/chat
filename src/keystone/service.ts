import { GET, PATCH, POST } from '../api';
import Routes from '../routes';
import { IRChannel, IRGetInitial, IRLogin, IRUser } from '../types/serverResponses';
import eventBus from '../utils/eventBus/eventBus';
import { EventBusEventEnum, ListenerEventEnum } from '../utils/eventBus/types';
import { Root } from './index';
import Sentry from 'sentry';

export const getInitialData = async (root: Root): Promise<void> => {
  try {
    const initial = (await GET(`get-initial`)) as IRGetInitial;
    const { publics, user, channels } = initial;
    root.chat.addUsers([user]);
    root.chat.addChannels(channels);
    root.chat.addPubs(publics);
    root.auth.setMe(user);
  } catch (e) {
    Sentry.captureException(e);
  }
};

export const login = async (root: Root, username: string, password?: string): Promise<void> => {
  try {
    const response = (await POST(`login`, {
      app_id: root.auth.appId,
      username,
      password,
    })) as IRLogin;
    root.auth.setAccessToken(response.access_token);
  } catch (e) {
    Sentry.captureException(e);
  }
};

export const signup = async (root: Root, username: string, password?: string): Promise<void> => {
  try {
    const response = (await POST(`signup`, {
      app_id: root.auth.appId,
      username,
      password,
    })) as IRLogin;
    root.auth.setAccessToken(response.access_token);
  } catch (e) {
    Sentry.captureException(e);
  }
};

export const saveProfile = async (root: Root, displayName: string, avatar?: string): Promise<void> => {
  const sendData: { displayName?: string; avatarUrl?: string } = {};
  if (displayName) {
    sendData.displayName = displayName;
  }

  if (avatar) {
    sendData.avatarUrl = avatar;
  }
  try {
    const user = (await PATCH(`profile`, sendData)) as IRUser;
    root.auth.setMe(user);
  } catch (e) {
    Sentry.captureException(e);
  }
};

export const joinChannel = async (root: Root, id: string): Promise<void> => {
  if (!root.chat.channels.has(id)) {
    try {
      const response = (await POST(`channels/join`, { id })) as IRChannel;
      if (root.chat.pubs.has(id)) {
        root.chat.pubs.delete(id);
      }

      root.chat.addChannels([response]);
    } catch (e) {
      Sentry.captureException(e);
    }
  }
};

export const joinChannelByExternalId = async (root: Root, externalId: string): Promise<void> => {
  const found = root.chat.channelsList.find((item) => item.externalId === externalId);

  if (found) {
    root.ui.setRoute(`${Routes.Channels}/${found.id}`);
  } else {
    try {
      const response = (await POST(`channels/join-external/${externalId}`)) as IRChannel;
      root.chat.pubs.delete(response.id);
      root.chat.addChannels([response]);
      root.ui.setRoute(`${Routes.Channels}/${response.id}`);
    } catch (e) {
      Sentry.captureException(e);
    }
  }
};

export const fetchMessagesBefore = async (
  root: Root,
  channelId: number,
  messageId: number,
  options?: { limit?: number; until?: number },
): Promise<number> => {
  const { limit, until } = options || {};
  try {
    const response = (await GET(`channels/${channelId}/messages`, {
      before: messageId,
      limit,
      until,
    })) as any;
    const channel = root.chat.channels.get(String(channelId));
    if (channel) {
      const message = channel.messages.get(String(messageId));
      if (message) {
        return channel.addMessages(response);
      }
    }
  } catch (e) {
    Sentry.captureException(e);
  }

  return 0;
};

export const redirectToInitial = (root: Root): Promise<void> | void => {
  if (root.ui.channelId) {
    return joinChannelByExternalId(root, root.ui.channelId);
  }

  return root.ui.setRoute(Routes.Channels);
};

export const sendMessage = async (root: Root, channelId: string, text: string): Promise<void> => {
  await POST(`messages/send`, { channelId, text });
  eventBus.emit(ListenerEventEnum.App, {
    event: EventBusEventEnum.MessageSent,
    data: {
      message: text,
    },
  });
};

export const getSettings = async (root: Root, appId: string): Promise<void> => {
  try {
    const settings = (await GET(`applications/${appId}/settings`)) as Record<string, unknown>;
    root.settings.setAll(settings);
  } catch (e) {
    Sentry.captureException(e);
  }
};

export default {};
