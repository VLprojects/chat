import api from '../../api';
import { IServerPoll } from '../CreatePollPage/types';

export const getPollListForChannel = (channelId: number): Promise<IServerPoll[]> =>
  api.get(`polls?channelId=${channelId}`) as Promise<IServerPoll[]>;

export const deletePoll = (pollId: number): Promise<unknown> => api.delete(`polls/${pollId}`);

export const startPoll = (pollId: number): Promise<IServerPoll> =>
  api.post(`polls/${pollId}/start`) as Promise<IServerPoll>;
export const stopPoll = (pollId: number): Promise<IServerPoll> =>
  api.post(`polls/${pollId}/stop`) as Promise<IServerPoll>;
