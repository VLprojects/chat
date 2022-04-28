export enum ListenerEventEnum {
  App = 'app',
}

export enum EventBusEventEnum {
  MessageSent = 'MessageSent',
  ChatLoaded = 'ChatLoaded',
  ChatClose = 'ChatClose',
}

export interface IEvents {
  event: EventBusEventEnum;
  data: Record<string | number, unknown>;
}
