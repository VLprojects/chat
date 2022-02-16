import { POST } from '../../api';
import Poll from '../../keystone/chat/poll';
import { IServerPollOption } from '../CreatePollPage/types';

export const doVote = async (poll: Poll, payload: string[]) => {
  const data = poll.isOpenEnded ? { answer: payload[0].trim(), poll_id: +poll.id } : { ids: payload.map(Number) };

  return (await POST(`polls/vote`, data)) as unknown as IServerPollOption[];
};
