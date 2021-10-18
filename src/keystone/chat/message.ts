import { model, Model, prop, Ref } from 'mobx-keystone';
import { MessageTypeEnum } from '../../types/enums';
import User from './user';

@model('Message')
export default class Message extends Model({
  id: prop<string>(),
  text: prop<string>(),
  type: prop<MessageTypeEnum>(),
  user: prop<Ref<User> | null>(),
  createdAt: prop<string>(),
}) {}