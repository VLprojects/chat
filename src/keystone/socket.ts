import Centrifuge from 'centrifuge';
import { getPinnedMessages } from 'containers/ChannelPage/service';
import { getRoot, model, Model, prop } from 'mobx-keystone';
import { IServerPoll } from '../containers/CreatePollPage/types';
import CentrifugeEventsEnum from '../types/centrifugeEvents';
import { IRChannel, ISEMessage, ISENewChannelUser } from '../types/serverResponses';
import SocketEventsEnum from '../types/socketEvents';
import { convertServerPollToModel } from '../utils/common';
import { Root } from './index';
import { joinChannel } from './service';

// has "Store" in name to not confuse with Socket instance
@model('SocketStore')
export default class SocketStore extends Model({
  isSocketConnected: prop<boolean>(false).withSetter(),
}) {
  connect(socketUrl: string, accessToken: string): void {
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

    const onMessagePinned = (data: { channelId: string }) => {
      const { channelId } = data;
      getPinnedMessages(root, channelId);
    };

    const onMessagesDelete = (data: { ids: number[]; channelId: number }) => {
      const { channelId, ids } = data;
      const channel = root.chat.channels.get(`${channelId}`);
      channel?.deleteMessages(ids);
    };

    const onCleanChannelMessages = (data: { channelId: number }) => {
      const { channelId } = data;
      const channel = root.chat.channels.get(`${channelId}`);
      channel?.cleanAllMessages();
    };

    const onUpdateProfile = (payload: { value: string; userId: number }) => {
      const { value, userId } = payload;

      return root.chat.updateUser({ userId, name: value });
    };

    const centrifuge = new Centrifuge(socketUrl);

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
        case SocketEventsEnum.MessagePinned:
          onMessagePinned(payload);
          break;
        case SocketEventsEnum.DeleteMessages:
          onMessagesDelete(payload);
          break;
        case SocketEventsEnum.CleanChannelMessages:
          onCleanChannelMessages(payload);
          break;
        default:
      }
    });

    centrifuge.setToken(accessToken);
    centrifuge.connect();
  }
}
