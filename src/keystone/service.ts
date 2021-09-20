import api from '../api';
import Routes from '../routes';
import { IRChannel, IRGetInitial, IRLogin, IRUser } from '../types/serverResponses';
import { Root } from './index';
import eventBus from '../utils/eventBus/eventBus';
import { EventBusEventEnum, ListenerEventEnum } from '../utils/eventBus/types';

export const getInitialData = async (root: Root): Promise<void> => {
  const initial = (await api.get(`get-initial`)) as IRGetInitial;
  const { settings, publics, user, users, channels } = initial;
  root.chat.addUsers(users); // users first to prevent auto-fetch
  root.chat.addChannels(channels);
  root.chat.addPubs(publics);
  root.auth.setMe(user);
  root.settings.setAll(settings);
};

export const login = async (root: Root, username: string, password?: string): Promise<void> => {
  const response = (await api.post(`login`, {
    app_id: root.auth.appId,
    username,
    password,
  })) as IRLogin;
  root.auth.setAccessToken(response.access_token);
};

export const signup = async (root: Root, username: string, password?: string): Promise<void> => {
  const response = (await api.post(`signup`, {
    app_id: root.auth.appId,
    username,
    password,
  })) as IRLogin;
  root.auth.setAccessToken(response.access_token);
};

export const saveProfile = async (root: Root, displayName: string, avatar?: string): Promise<void> => {
  const sendData: { displayName?: string; avatarUrl?: string } = {};
  if (displayName) {
    sendData.displayName = displayName;
  }

  if (avatar) {
    sendData.avatarUrl = avatar;
  }

  const user = (await api.patch(`profile`, sendData)) as IRUser;
  root.auth.setMe(user);
};

export const joinChannel = async (root: Root, id: string): Promise<void> => {
  if (!root.chat.channels.has(id)) {
    const response = (await api.post(`channels/join`, { id })) as IRChannel;
    if (root.chat.pubs.has(id)) {
      root.chat.pubs.delete(id);
    }

    root.chat.addChannels([response]);
  }
};

export const joinChannelByExternalId = async (root: Root, externalId: string): Promise<void> => {
  const found = root.chat.channelsList.find((item) => item.externalId === externalId);
  if (found) {
    root.ui.setRoute(`${Routes.Channels}/${found.id}`);
  } else {
    const response = (await api.post(`channels/join-external/${externalId}`)) as IRChannel;
    root.chat.pubs.delete(externalId);
    root.chat.addChannels([response]);
    root.ui.setRoute(`${Routes.Channels}/${response.id}`);
  }
};

export const redirectToInitial = (root: Root): void => {
  if (!root.ui.channelId) {
    root.ui.setRoute(Routes.Channels);
  } else {
    joinChannelByExternalId(root, root.ui.channelId);
  }
};

export const sendMessage = async (root: Root, channelId: string, text: string): Promise<void> => {
  await api.post(`messages/send`, { channelId, text });
  eventBus.emit(ListenerEventEnum.App, {
    event: EventBusEventEnum.MessageSent,
    data: {
      message: text,
    },
  });
};

export const getSettings = async (root: Root, appId: string): Promise<void> => {
  const settings = (await api.get(`applications/${appId}/settings`)) as Record<string, unknown>;
  root.settings.setAll(settings);
};

export default {};
