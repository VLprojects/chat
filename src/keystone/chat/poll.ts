import { Model, model, prop, rootRef } from 'mobx-keystone';
import { IServerPollOption } from '../../containers/CreatePollPage/types';
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
  status: prop<IPollStatus>(() => IPollStatus.New),
}) {}

export const pollRef = rootRef<Poll>('PollRef', {
  getId(maybePoll) {
    return maybePoll instanceof Poll ? maybePoll.id : undefined;
  },
});
