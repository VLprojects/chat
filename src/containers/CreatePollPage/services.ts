import { POST } from '../../api';
import { ICreatePollForm, IServerPoll } from './types';

export const createPoll = (payload: ICreatePollForm, channelId: number): Promise<IServerPoll> =>
  POST(`polls/create`, {
    ...payload,
    channelId,
    options: payload.options.map((option, idx) => ({ option, valid: payload.validOptions[idx] })),
  }) as Promise<IServerPoll>;
