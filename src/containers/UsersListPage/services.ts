import { getDirectsList } from 'components/DirectList/service';
import { Root } from 'keystone';
import Sentry from 'sentry';

import { POST } from '../../api';
import Channel from '../../keystone/chat/channel';
import User from '../../keystone/chat/user';
import { joinChannel } from '../../keystone/service';
import Routes from '../../routes';
import { IRChannel } from '../../types/serverResponses';

export const createNewDirectChannel = async (root: Root, chatWithUser: User): Promise<IRChannel | undefined> => {
  try {
    const channel = (await POST(`channels/create-direct`, {
      userId: chatWithUser.id,
    })) as IRChannel;
    await getDirectsList(root);

    return channel;
  } catch (e) {
    Sentry.captureException(e);
  }
};
export const searchDirectChannelWithUser = (root: Root, chatWithUser: User): Channel | undefined => {
  const directChannels = root.chat.directChannelsList;
  return directChannels.find((channel) => channel.directUsersOnly.find((u) => u.id === chatWithUser.id));
};

export const createOrOpenDirectChat = async (root: Root, chatWithUser: User): Promise<void> => {
  const channel = searchDirectChannelWithUser(root, chatWithUser);
  if (channel?.id) return root.ui.setRoute(`${Routes.Channels}/${channel.id}`);

  const newChannel = await createNewDirectChannel(root, chatWithUser);
  if (newChannel) {
    await joinChannel(root, newChannel.id);
    return root.ui.setRoute(`${Routes.Channels}/${newChannel.id}`);
  }
};
