import api from '../../api';

export const doVote = (payload: string[]): Promise<unknown> => api.post(`polls/vote`, { ids: payload.map(Number) });
