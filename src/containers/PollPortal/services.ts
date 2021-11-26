import { POST } from '../../api';

export const doVote = (payload: string[]): void => {
  POST(`polls/vote`, { ids: payload.map(Number) });
};
