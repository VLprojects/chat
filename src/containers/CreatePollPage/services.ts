import { POST } from '../../api';
import { ICreatePollForm, IServerPoll } from './types';
import intl from '../../utils/intl';
import Poll from '../../keystone/chat/poll';

export const createPoll = (payload: ICreatePollForm, channelId: number): Promise<IServerPoll> =>
  POST(`polls/create`, {
    ...payload,
    channelId,
    options: payload.options.map((option, idx) => ({ option, valid: payload.validOptions[idx] })),
  }) as Promise<IServerPoll>;

export const getFormatMessagePollType = (poll: Poll): string => {
  let formatMessage: string;
  if (poll.withAnswer) {
    formatMessage = 'pollWithCorrectAnswer';
  } else if (poll.isOpenEnded) {
    formatMessage = 'pollOpenEnded';
  } else {
    formatMessage = 'multipleAnswerOptions';
  }

  return intl.formatMessage({ id: formatMessage });
};
