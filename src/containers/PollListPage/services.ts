import * as Sentry from '@sentry/react';
import { DELETE, GET, POST } from '../../api';
import { IServerPoll } from '../CreatePollPage/types';

export const getPollListForChannel = async (channelId: number): Promise<IServerPoll[] | undefined> => {
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

export const deletePoll = async (pollId: number): Promise<void | undefined> => {
  try {
    await DELETE(`polls/${pollId}`);
  } catch (e) {
    Sentry.captureException(e);
  }
};

export const startPoll = async (pollId: number): Promise<IServerPoll | undefined> => {
  try {
    return (await POST(`polls/${pollId}/start`)) as Promise<IServerPoll>;
  } catch (e) {
    Sentry.captureException(e);
  }
};
export const stopPoll = async (pollId: number): Promise<IServerPoll | undefined> => {
  try {
    return (await POST(`polls/${pollId}/stop`)) as Promise<IServerPoll>;
  } catch (e) {
    Sentry.captureException(e);
  }
};
