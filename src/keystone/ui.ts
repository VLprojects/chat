import { Model, model, prop } from 'mobx-keystone';

@model('UI')
export default class UI extends Model({
  route: prop<string>('').withSetter(),
  channelId: prop<string>('').withSetter(),
  params: prop<Record<string, unknown>>(() => ({})).withSetter(),
  authError: prop<string>('').withSetter(),
  profileError: prop<string>('').withSetter(),
  messageSendError: prop<string>('').withSetter(),
}) {}
