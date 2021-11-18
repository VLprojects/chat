import { compareAsc } from 'date-fns';
import { computed } from 'mobx';
import { getRoot, model, Model, modelAction, objectMap, prop, Ref } from 'mobx-keystone';
import { IServerPoll } from '../../containers/CreatePollPage/types';
import { ChannelTypeEnum } from '../../types/enums';
import { IRChannelMessage } from '../../types/serverResponses';
import { IPollStatus } from '../../types/types';
import { convertServerPollToModel } from '../../utils/common';
import Message from './message';
import Poll, { pollRef } from './poll';
import User, { userRef } from './user';

@model('Channel')
export default class Channel extends Model({
  name: prop<string>(() => ''),
  id: prop<string>(),
  externalId: prop<string>(''),
  type: prop<ChannelTypeEnum>(ChannelTypeEnum.Public),
  messages: prop(() => objectMap<Message>()),
  users: prop(() => objectMap<Ref<User>>()),
  polls: prop<Poll[]>(() => []),
  activePoll: prop<Ref<Poll> | undefined>(() => undefined),
}) {
  @modelAction
  addMessages(messages: IRChannelMessage[]): void {
    messages.forEach((message) => {
      // temporarily ignore messages without user
      if (message.userId) {
        const messageModel = new Message({
          id: message.id,
          text: message.text,
          type: message.type,
          createdAt: message.createdAt,
          user: userRef(getRoot(this).chat.getUserLazy(message.userId)),
        });
  
        this.messages.set(message.id, messageModel);
      }
    });
  }

  @modelAction
  addUsers(userIds: string[]): void {
    userIds.forEach((userId) => {
      this.users.set(userId, userRef(getRoot(this).chat.getUserLazy(userId)));
    });
  }

  @modelAction
  setPollList(items: IServerPoll[]): void {
    const pollModels = items.map(convertServerPollToModel);
    this.polls = pollModels;
  }

  @modelAction
  addPoll(poll: IServerPoll): void {
    const pollModel = convertServerPollToModel(poll);
    this.polls.push(pollModel);
  }

  @modelAction
  deletePoll(poll: Poll): void {
    if (poll.id === this.activePoll?.current.id) this.activePoll = undefined;
    this.polls = this.polls.filter((p) => p.id !== poll.id);
  }

  @modelAction
  startPoll(poll: Poll): void {
    if (poll) {
      let find = false;

      this.polls.forEach((p) => {
        if (p.id === poll.id) {
          // poll exist
          p.status = poll.status;
          find = true;
        }
      });

      if (!find) this.polls.push(poll);
    }

    this.activePoll = poll ? pollRef(poll) : undefined;
  }

  @modelAction
  setPollVoted(payload: string[]): void {
    payload.forEach((voteId) => {
      this.activePoll?.current.options.forEach((option) => {
        if (+option.id === +voteId) {
          option.isVoted = true;
        }
      });
    });
  }

  @modelAction
  updateVotesCounter(ids: number[]): void {
    ids.forEach((id) =>
      this.activePoll?.current.options.forEach((option) => {
        if (+option.id === +id) {
          option.votesCount += 1;
        }
      }),
    );
  }

  @modelAction
  stopPoll(poll: Poll): void {
    if (this.activePoll && poll) this.activePoll.current.status = poll.status;

    this.activePoll = undefined;

    this.polls.forEach((p) => {
      if (p.id === poll.id) {
        p.status = IPollStatus.Done;
      }
    });
  }

  @modelAction
  closePollPortal(): void {
    this.activePoll = undefined;
  }

  @modelAction
  pollResult(poll: Poll): void {
    this.activePoll = poll ? pollRef(poll) : undefined;
  }

  @computed
  get sortedMessages(): Message[] {
    return Array.from(this.messages.values()).sort((a: Message, b: Message) =>
      compareAsc(new Date(a.createdAt), new Date(b.createdAt)),
    );
  }

  @computed
  get messagesCount(): number {
    return this.messages.size;
  }

  @computed
  get userList(): User[] {
    return Array.from(this.users.values()).map((ref) => ref.current);
  }

  @computed
  get getActivePoll(): Poll | undefined {
    return this.activePoll?.maybeCurrent;
  }
}
