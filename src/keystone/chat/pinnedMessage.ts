import { Model, model, prop, rootRef } from 'mobx-keystone';
import { IRChannelMessage } from 'types/serverResponses';

@model('PinnedMessage')
export default class PinnedMessage extends Model({
  id: prop<string>(),
  channelId: prop<number>(),
  messageId: prop<number>(),
  message: prop<IRChannelMessage>(),
}) {}

export const pinnedMessageRef = rootRef<PinnedMessage>('PinnedMessageRef', {
  getId(maybePinnedMessage) {
    return maybePinnedMessage instanceof PinnedMessage ? maybePinnedMessage.id : undefined;
  },
});
