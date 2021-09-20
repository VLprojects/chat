import { getRoot, model, Model, prop } from 'mobx-keystone';
import { io } from 'socket.io-client';
import { IRChannel, ISEMessage, ISENewChannelUser } from '../types/serverResponses';
import SocketEventsEnum from '../types/socketEvents';
import { Root } from './index';
import { joinChannel } from './service';

// has "Store" in name to not confuse with Socket instance
@model('SocketStore')
export default class SocketStore extends Model({
  isSocketConnected: prop<boolean>(false).withSetter(),
}) {
  connect(uri: string, accessToken: string): void {
    const root: Root = getRoot(this);

    const onMessage = ({ channelId, message }: ISEMessage) => {
      const channel = root.chat.channels.get(channelId);
      if (channel) {
        channel.addMessages([message]);
      }
    };

    const onNewChannelUser = ({ channelId, userId }: ISENewChannelUser): void => {
      const channel = root.chat.channels.get(channelId);
      if (channel) {
        channel.addUsers([userId]);
      }
    };

    const onNewDirect = (channel: IRChannel): void => {
      joinChannel(root, channel.id);
    };

    const socket = io(uri, {
      auth: {
        token: accessToken,
      },
    });

    socket.on(SocketEventsEnum.Connect, () => {
      this.setIsSocketConnected(true);
    });

    socket.on(SocketEventsEnum.Message, onMessage);
    socket.on(SocketEventsEnum.SystemMessage, onMessage);
    socket.on(SocketEventsEnum.NewChannelUser, onNewChannelUser);
    socket.on(SocketEventsEnum.NewDirect, onNewDirect);
  }
}
