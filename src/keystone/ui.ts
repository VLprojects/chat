import { Model, model, modelAction, prop } from 'mobx-keystone';

@model('UI')
export default class UI extends Model({
  route: prop<string>(''),
  channelId: prop<string>('').withSetter(),
  params: prop<Record<string, unknown>>(() => ({})).withSetter(),
  // pinnedMessageIdx: prop<number | undefined>().withSetter(),
  pinnedMessageIdx: prop<Record<string, number>>(() => ({})).withSetter(),
}) {
  routeHistory: string[] = [];

  @modelAction
  setRoute(route: string): void {
    this.route = route;
    this.routeHistory.unshift(route);
  }

  @modelAction
  back(): void {
    this.routeHistory.shift();
    [this.route] = this.routeHistory;
  }
}
