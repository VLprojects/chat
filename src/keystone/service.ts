import { Root } from './index';
import api from '../api';
import { IRChannel, IRGetInitial, IRLogin } from '../types/serverResponses';
import Routes from '../routes';

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
  try {
    const response = (await api.post(`login`, {
      api_token: root.auth.apiToken,
      username,
      password,
    })) as IRLogin;
    root.auth.setAccessToken(response.access_token);
  } catch (e) {
    root.ui.setAuthError(e.message);
  }
};

export const signup = async (root: Root, username: string, password?: string): Promise<void> => {
  try {
    const response = (await api.post(`signup`, {
      api_token: root.auth.apiToken,
      username,
      password,
    })) as IRLogin;
    root.auth.setAccessToken(response.access_token);
  } catch (e) {
    root.ui.setAuthError(e.message);
  }
};

export const saveProfile = async (root: Root, username: string, avatar?: string): Promise<void> => {
  const sendData: { username?: string; avatarUrl?: string } = {};
  if (username) {
    sendData.username = username;
  }
  if (avatar) {
    sendData.avatarUrl = avatar;
  }
  try {
    await api.patch(`profile`, sendData);
    root.ui.setProfileError('');
  } catch (e) {
    root.ui.setProfileError(e.messsage);
  }
};

export const joinChannel = async (root: Root, id: string): Promise<void> => {
  if (!root.chat.channels.has(id)) {
    const response = (await api.post(`channels/join`, { id })) as IRChannel;
    root.chat.pubs.delete(id);
    root.chat.addChannels([response]);
  }

  root.ui.setRoute(`${Routes.Channels}/${id}`);
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
  root.ui.setMessageSendError('');
  try {
    await api.post(`messages/send`, { channelId, text });
  } catch (e) {
    root.ui.setMessageSendError(JSON.stringify(e));
  }
};

export default {};
