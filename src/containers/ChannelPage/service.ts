import { DELETE, GET, POST } from 'api';
import { Root } from 'keystone';
import { IRPinnedMessage } from 'types/serverResponses';

export const getPinnedMessages = async (root: Root, channelId: string): Promise<void> => {
  const channel = root.chat.channels.get(channelId);
  try {
    const response = (await GET(`messages-pinned/channel/${channelId}`)) as IRPinnedMessage[];
    channel?.setPinnedMessages(response);
  } catch (e) {
    channel?.setPinnedMessages([]);
  }
};

export const pinMessage = (root: Root, messageId: number): void => {
  const channelId = Number(root.ui.params.id);

  POST(`messages-pinned`, { channelId, messageId });
};

export const deletePinnedMessage = (messageId: string): void => {
  DELETE(`messages-pinned/${+messageId}`);
};

export const deleteMessage = (messageId: number): void => {
  DELETE(`messages/${+messageId}`);
};

export const deleteAllMessage = (root: Root): void => {
  const channelId = Number(root.ui.params.id);

  DELETE(`messages/channel/${channelId}`);
};

export default {};
