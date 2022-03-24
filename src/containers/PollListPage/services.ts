import { AxiosError } from 'axios';
import Channel from 'keystone/chat/channel';
import Poll from 'keystone/chat/poll';
import { DELETE, GET, POST } from '../../api';
import { IServerPoll } from '../CreatePollPage/types';
import Sentry from 'sentry';

export const getPollListForChannel = async (channelId?: string): Promise<IServerPoll[] | undefined> => {
  try {
    return (await GET(`polls?channelId=${channelId}`)) as Promise<IServerPoll[]>;
  } catch (e) {
    Sentry.captureException(e);
  }
};

export const getPollById = async (pollId: number): Promise<IServerPoll | undefined> => {
  try {
    return (await GET(`polls/${pollId}`)) as Promise<IServerPoll>;
  } catch (e) {
    Sentry.captureException(e);
  }
};

export const deletePoll = async (pollId: number): Promise<boolean> => {
  try {
    await DELETE(`polls/${pollId}`);
    return true;
  } catch (e) {
    Sentry.captureException(e);
    return false;
  }
};

export const startPoll = async (pollId?: string): Promise<IServerPoll | undefined> => {
  try {
    if (!pollId) throw new Error('No poll id');

    return (await POST(`polls/${pollId}/start`)) as Promise<IServerPoll>;
  } catch (e) {
    Sentry.captureException(e);
  }
};
export const stopPoll = async (pollId?: string): Promise<IServerPoll | undefined> => {
  try {
    if (!pollId) throw new Error('No poll id');
    return (await POST(`polls/${pollId}/stop`)) as Promise<IServerPoll>;
  } catch (e) {
    Sentry.captureException(e);
  }
};

interface IOnPollEnd {
  activePoll?: Poll;
  channel?: Channel;
  defaultErrorAction?: () => void;
}
export const onPollEndHandler = async (props: IOnPollEnd) => {
  const { activePoll, channel, defaultErrorAction } = props;
  if (!activePoll || !channel) return;

  try {
    await stopPoll(activePoll?.id);
    channel?.stopPoll(activePoll);
  } catch (e) {
    const err = e as AxiosError;
    switch (err?.response?.status) {
      case 409:
        channel?.stopPoll(activePoll);
        break;
      default:
        defaultErrorAction && defaultErrorAction();
        break;
    }
  }
};

interface IOnPollStart {
  templatePoll?: Poll;
  channel?: Channel;
}
export const onPollStartHandler = (props: IOnPollStart) => {
  const { templatePoll, channel } = props;
  if (!templatePoll || !channel) return;

  startPoll(templatePoll?.id);
};

