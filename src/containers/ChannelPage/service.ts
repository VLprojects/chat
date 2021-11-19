import api from 'api';
import { Root } from 'keystone';
import { IRPinnedMessage } from 'types/serverResponses';

export const getPinnedMessages = async (root: Root, channelId: string): Promise<void> => {
  const channel = root.chat.channels.get(channelId);
  try {
    const response = (await api.get(`messages-pinned/channel/${channelId}`)) as IRPinnedMessage[];
    channel?.setPinnedMessages(response);
  } catch (e) {
    channel?.setPinnedMessages([]);
  }
};

export const pinMessage = (root: Root, messageId: number): void => {
  const channelId = Number(root.ui.params.id);

  api.post(`messages-pinned`, { channelId, messageId });
};

export const deletePinnedMessage = (messageId: string): void => {
  api.delete(`messages-pinned/${+messageId}`);
};

export default {};
