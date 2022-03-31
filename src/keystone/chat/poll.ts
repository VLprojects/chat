import { Model, model, modelAction, prop, rootRef } from 'mobx-keystone';

import { IServerPollOption, IServerPollVote } from '../../containers/CreatePollPage/types';
import { IPollStatus } from '../../types/types';

@model('Poll')
export default class Poll extends Model({
  id: prop<string>(),
  question: prop<string>(''),
  isOpenEnded: prop<boolean>(() => false),
  withAnswer: prop<boolean>(() => false),
  isVoted: prop<boolean>(() => false),
  options: prop<IServerPollOption[]>(() => []),
  validOptions: prop<string[]>(() => []),
  templateId: prop<number | undefined | null>(),
  createdAt: prop<string>(),
  stoppedAt: prop<string>(),
  status: prop<IPollStatus>(() => IPollStatus.New).withSetter(),
  votes: prop<IServerPollVote[]>(() => []),
}) {
  @modelAction
  changeStatus(status: IPollStatus): void {
    this.setStatus(status);
  }

  @modelAction
  addVote(vote: IServerPollVote) {
    this.votes.push(vote);
  }
}

export const pollRef = rootRef<Poll>('PollRef', {
  getId(maybePoll) {
    return maybePoll instanceof Poll ? maybePoll.id : undefined;
  },
});
