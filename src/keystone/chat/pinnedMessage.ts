import { Model, model, prop, rootRef, Ref } from 'mobx-keystone';
import { IRChannelMessage } from 'types/serverResponses';
import User from './user';

@model('PinnedMessage')
export default class PinnedMessage extends Model({
  id: prop<string>(),
  channelId: prop<number>(),
  messageId: prop<number>(),
  message: prop<IRChannelMessage>(),
  user: prop<Ref<User>>(),
}) {}

export const pinnedMessageRef = rootRef<PinnedMessage>('PinnedMessageRef', {
  getId(maybePinnedMessage) {
    return maybePinnedMessage instanceof PinnedMessage ? maybePinnedMessage.id : undefined;
  },
});
