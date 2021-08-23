import { compareAsc } from 'date-fns';
import { computed } from 'mobx';
import { getRoot, model, Model, modelAction, objectMap, prop, Ref } from 'mobx-keystone';
import { ChannelTypeEnum, MessageTypeEnum } from '../../types/enums';
import { IRChannelMessage } from '../../types/serverResponses';
import Message from './message';
import User, { userRef } from './user';

@model('Channel')
export default class Channel extends Model({
  name: prop<string>(() => ''),
  id: prop<string>(),
  externalId: prop<string>(''),
  type: prop<ChannelTypeEnum>(ChannelTypeEnum.Public),
  users: prop<Ref<User>[]>(() => []), // todo convert to map or delete
  messages: prop(() => objectMap<Message>()),
}) {
  @modelAction
  addMessages(messages: IRChannelMessage[]): void {
    messages.forEach((message) => {
      const messageModel = new Message({
        id: message.id,
        text: message.text,
        type: message.type,
        createdAt: message.createdAt,
        user: [MessageTypeEnum.System].includes(message.type)
          ? null
          : userRef(getRoot(this).chat.getUserLazy(message.userId)),
      });

      this.messages.set(message.id, messageModel);
    });
  }

  @computed
  get sortedMessages(): Message[] {
    return Array.from(this.messages.values()).sort((a: Message, b: Message) =>
      compareAsc(new Date(a.createdAt), new Date(b.createdAt)),
    );
  }

  @computed
  get messagesCount(): number {
    return this.messages.size;
  }
}
