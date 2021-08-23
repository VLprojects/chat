import { Model, model, prop } from 'mobx-keystone';

@model('Pub')
export default class Pub extends Model({
  id: prop<string>(''),
  name: prop<string>(''),
}) {}
