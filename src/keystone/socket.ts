import Centrifuge from 'centrifuge';
import { observable, runInAction } from 'mobx';
import { chunkProcessor, IDisposer } from 'mobx-utils';
import { getPinnedMessages } from 'containers/ChannelPage/service';
import { getRoot, model, Model, prop } from 'mobx-keystone';
import { MIN_SOCKET_RECONNECT_TIME } from 'utils/consts';
import { IServerPoll } from '../containers/CreatePollPage/types';
import CentrifugeEventsEnum from '../types/centrifugeEvents';
import { IRChannel, IRChannelMessage, ISEMessage } from 'types/serverResponses';
import SocketEventsEnum from '../types/socketEvents';
import { convertServerPollToModel } from '../utils/common';
import { Root } from './index';
import { joinChannel } from './service';

// has "Store" in name to not confuse with Socket instance
@model('SocketStore')
export default class SocketStore extends Model({
  isSocketConnected: prop<boolean>(false).withSetter(),
}) {
  @observable messageChunk: { channelId: string; message: IRChannelMessage }[] = [];

  messageRate = 0;

  private startMessageProcessing(): IDisposer {
    const root: Root = getRoot(this);
    const processMessages = (chunk: { channelId: string; message: IRChannelMessage }[]) => {
      const messagesByChannels = new Map<string, IRChannelMessage[]>();

      chunk.forEach(({ channelId, message }) => {
        if (!messagesByChannels.has(channelId)) {
          messagesByChannels.set(channelId, []);
        }

        messagesByChannels.get(channelId)?.push(message);
      });

      messagesByChannels.forEach((messages, channelId) => {
        const channel = root.chat.channels.get(channelId);
        if (channel) {
          channel.addMessages(messages);
        }
      });
    };

    return chunkProcessor(
      this.messageChunk,
      (chunk) => {
        processMessages(chunk);
      },
      300, // ms
      1000, // size
    );
  }

  onAttachedToRootStore(): () => void {
    const messageProcessingDisposer = this.startMessageProcessing();

    const messageRateInterval = setInterval(() => {
      // TODO remove. for debug in production environments
      (window as any).chatRate = this.messageRate;

      this.messageRate = 0;
    }, 1000);

    return () => {
      messageProcessingDisposer();
      clearInterval(messageRateInterval);
    };
  }

  connect(socketUrl: string, accessToken: string): void {
    const root: Root = getRoot(this);

    const onMessage = ({ channelId, message }: ISEMessage) => {
      this.messageRate += 1;
      runInAction(() => this.messageChunk.push({ channelId, message }));
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

    const onPollVote = (data: { channelId: number; pollOptionsIds?: number[]; pollId: number }) => {
      const { channelId, pollOptionsIds } = data;
      const channel = root.chat.channels.get(`${channelId}`);
      if (!channel || !pollOptionsIds) return;
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

    centrifuge.on(CentrifugeEventsEnum.Disconnect, (ctx) => {
      this.setIsSocketConnected(false);

      const intervalId = setInterval(() => {
        if (centrifuge.isConnected()) {
          clearInterval(intervalId);
        } else {
          centrifuge.connect();
        }
      }, MIN_SOCKET_RECONNECT_TIME);
    });

    centrifuge.on(CentrifugeEventsEnum.Publish, (ctx) => {
      const { event, payload } = ctx.data;
      switch (event) {
        case SocketEventsEnum.SystemMessage:
        case SocketEventsEnum.Message:
          onMessage(payload);
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
