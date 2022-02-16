import { DELETE, GET, POST } from '../../api';
import { IServerPoll } from '../CreatePollPage/types';

export const getPollListForChannel = (channelId: number): Promise<IServerPoll[]> =>
  GET(`polls?channelId=${channelId}`) as Promise<IServerPoll[]>;

export const getPollById = (pollId: number): Promise<IServerPoll> => GET(`polls/${pollId}`) as Promise<IServerPoll>;

export const deletePoll = (pollId: number): void => {
  DELETE(`polls/${pollId}`);
};

export const startPoll = (pollId: number): Promise<IServerPoll> =>
  POST(`polls/${pollId}/start`) as Promise<IServerPoll>;
export const stopPoll = (pollId: number): Promise<IServerPoll> => POST(`polls/${pollId}/stop`) as Promise<IServerPoll>;
