export enum ListenerEventEnum {
  App = 'app',
}

export enum EventBusEventEnum {
  MessageSent = 'MessageSent',
}

export interface IEvents {
  event: EventBusEventEnum;
  data: Record<string | number, unknown>;
}
