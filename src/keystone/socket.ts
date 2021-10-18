import { getRoot, model, Model, prop } from 'mobx-keystone';
import Centrifuge from 'centrifuge';
import { IServerPoll } from '../containers/CreatePollPage/types';
import { IRChannel, ISEMessage, ISENewChannelUser } from '../types/serverResponses';
import SocketEventsEnum from '../types/socketEvents';
import { convertServerPollToModel } from '../utils/common';
import { Root } from './index';
import { joinChannel } from './service';
import CentrifugeEventsEnum from '../types/centrifugeEvents';

// has "Store" in name to not confuse with Socket instance
@model('SocketStore')
export default class SocketStore extends Model({
  isSocketConnected: prop<boolean>(false).withSetter(),
}) {
  connect(accessToken: string): void {
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

    const onPollStart = (poll: IServerPoll & { channelId: number }) => {
      const channel = root.chat.channels.get(`${poll.channelId}`);
      if (!channel) return;

      channel.startPoll(convertServerPollToModel(poll));
    };

    const onPollStop = (poll: IServerPoll & { channelId: number }) => {
      const channel = root.chat.channels.get(`${poll.channelId}`);
      if (!channel) return;

      channel.stopPoll(convertServerPollToModel(poll));
    };

    const onPollVote = (data: { channelId: number; pollOptionsIds: number[] }) => {
      const { channelId, pollOptionsIds } = data;
      const channel = root.chat.channels.get(`${channelId}`);
      if (!channel) return;
      channel.updateVotesCounter(pollOptionsIds);
    };

    const onUpdateProfile = (payload: { value: string; userId: number }) => {
      const { value, userId } = payload;

      return root.chat.updateUser({ userId, name: value });
    };

    const centrifuge = new Centrifuge(`${process.env.REACT_APP_WS_URL}`);

    centrifuge.on(CentrifugeEventsEnum.Connect, () => {
      this.setIsSocketConnected(true);
    });

    centrifuge.on(CentrifugeEventsEnum.Publish, (ctx) => {
      const { event, payload } = ctx.data;
      switch (event) {
        case SocketEventsEnum.SystemMessage:
        case SocketEventsEnum.Message:
          onMessage(payload);
          break;
        case SocketEventsEnum.NewChannelUser:
          onNewChannelUser(payload);
          break;
        case SocketEventsEnum.NewDirect:
          onNewDirect(payload);
          break;
        case SocketEventsEnum.PollStart:
          onPollStart(payload);
          break;
        case SocketEventsEnum.PollStop:
          onPollStop(payload);
          break;
        case SocketEventsEnum.PollVote:
          onPollVote(payload);
          break;
        case SocketEventsEnum.UserUpdateProfile:
          onUpdateProfile(payload);
          break;
        default:
      }
    });

    centrifuge.setToken(accessToken);
    centrifuge.connect();
  }
}
