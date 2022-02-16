import { IPollStatus } from '../../types/types';

export interface ICreatePollForm {
  channelId?: string;
  question: string;
  withAnswer: boolean;
  isOpenEnded: boolean;
  options: string[];
  validOptions: string[];
  templateId?: number | null;
}

export interface IServerPollVote {
  id: number;
  userId?: number;
  answer?: string;
  user: IServerPollVotesUser;
}

export interface IServerPollOption {
  id: number;
  option: string;
  valid: boolean;
  votesCount: number;
  pollVotes?: IServerPollVote[];
  isVoted?: boolean;
}

export interface IServerPoll {
  id: number;
  channelId: number;
  question: string;
  isVoted: boolean | null;
  withAnswer: boolean;
  isOpenEnded: boolean;
  status: IPollStatus;
  options: IServerPollOption[];
  votes?: IServerPollVote[];
  templateId?: number | null;
}

export interface IServerPollVotesUser {
  id: number;
  username: string;
  displayName: string;
}

export enum PollTypeEnum {
  OneAnswer = 'one_answer',
  MultipleAnswer = 'multiple_answer',
  OpenEndedAnswer = 'open_ended_answer',
}
