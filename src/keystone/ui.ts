import { Model, model, modelAction, prop } from 'mobx-keystone';

@model('UI')
export default class UI extends Model({
  route: prop<string>(''),
  channelId: prop<string>('').withSetter(),
  params: prop<Record<string, unknown>>(() => ({})).withSetter(),
  initialized: prop<boolean>(false).withSetter(),
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
