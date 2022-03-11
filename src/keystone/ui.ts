import { Model, model, modelAction, prop } from 'mobx-keystone';

interface IParams {
  id?: string; // channel id - wrong place,
  pollId?: string; // poll id - wrong place,
  [key: string]: unknown;
}

@model('UI')
export default class UI extends Model({
  route: prop<string>(''),
  channelId: prop<string>('').withSetter(),
  params: prop<IParams>(() => ({})).withSetter(),
}) {
  jumpToMessage: (index: number) => void = () => undefined;

  setJumpToMessage(handler: (index: number) => void): void {
    this.jumpToMessage = handler;
  }

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
