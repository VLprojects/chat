import { IPollStatus } from '../../types/types';

export interface ICreatePollForm {
  channelId: string;
  question: string;
  withAnswer: boolean;
  options: string[];
  validOptions: string[];
}

export interface IServerPollVote {
  id: number;
  userId: number;
}
export interface IServerPollOption {
  id: number;
  option: string;
  valid: boolean;
  votesCount: number;
  pollVotes: IServerPollVote[];
  isVoted?: boolean;
}
export interface IServerPoll {
  id: number;
  question: string;
  status: IPollStatus;
  options: IServerPollOption[];
}
