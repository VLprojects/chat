import { getPollListForChannel } from '../containers/PollListPage/services';
import { GET, POST, PATCH } from '../api';
import Routes from '../routes';
import { IRChannel, IRGetInitial, IRLogin, IRUser } from '../types/serverResponses';
import { convertServerPollToModel } from '../utils/common';
import eventBus from '../utils/eventBus/eventBus';
import { EventBusEventEnum, ListenerEventEnum } from '../utils/eventBus/types';
import { Root } from './index';

export const getInitialData = async (root: Root): Promise<void> => {
  const initial = (await GET(`get-initial`)) as IRGetInitial;
  const { publics, user, users, channels, polls } = initial;
  root.chat.addUsers(users); // users first to prevent auto-fetch
  root.chat.addChannels(channels);
  root.chat.addPubs(publics);
  root.auth.setMe(user);
  polls.forEach((poll) => {
    const channel = root.chat.channels.get(`${poll.channelId}`);
    channel?.addPoll(poll);
    channel?.startPoll(convertServerPollToModel(poll));
  });
};

export const login = async (root: Root, username: string, password?: string): Promise<void> => {
  const response = (await POST(`login`, {
    app_id: root.auth.appId,
    username,
    password,
  })) as IRLogin;
  root.auth.setAccessToken(response.access_token);
};

export const signup = async (root: Root, username: string, password?: string): Promise<void> => {
  const response = (await POST(`signup`, {
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

  const user = (await PATCH(`profile`, sendData)) as IRUser;
  root.auth.setMe(user);
};

export const loadChannelPolls = async (root: Root, channelId: string): Promise<void> => {
  const polls = await getPollListForChannel(Number(channelId));
  polls.forEach((poll) => {
    const channel = root.chat.channels.get(channelId);
    channel?.addPoll(poll);
    channel?.startPoll(convertServerPollToModel(poll));
  });
};

export const joinChannel = async (root: Root, id: string): Promise<void> => {
  if (!root.chat.channels.has(id)) {
    const response = (await POST(`channels/join`, { id })) as IRChannel;
    if (root.chat.pubs.has(id)) {
      root.chat.pubs.delete(id);
    }

    root.chat.addChannels([response]);
    await loadChannelPolls(root, id);
  }
};

export const joinChannelByExternalId = async (root: Root, externalId: string): Promise<void> => {
  const found = root.chat.channelsList.find((item) => item.externalId === externalId);

  if (found) {
    root.ui.setRoute(`${Routes.Channels}/${found.id}`);
  } else {
    const response = (await POST(`channels/join-external/${externalId}`)) as IRChannel;
    root.chat.pubs.delete(response.id);
    root.chat.addChannels([response]);
    await loadChannelPolls(root, response.id);
    root.ui.setRoute(`${Routes.Channels}/${response.id}`);
  }
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
  const settings = (await GET(`applications/${appId}/settings`)) as Record<string, unknown>;
  root.settings.setAll(settings);
};

export default {};
