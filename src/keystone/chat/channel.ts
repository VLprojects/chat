import { compareAsc } from 'date-fns';
import { computed } from 'mobx';
import { getRoot, model, Model, modelAction, objectMap, prop, Ref } from 'mobx-keystone';
import { sortPollDesc } from 'utils/helper';
import { IServerPoll, IServerPollOption } from '../../containers/CreatePollPage/types';
import { ChannelTypeEnum, MessageTypeEnum } from '../../types/enums';
import { IRChannelMessage, IRPinnedMessage } from '../../types/serverResponses';
import { IPollStatus } from '../../types/types';
import { convertServerPollToModel } from '../../utils/common';
import Message, { SystemMessageEnum } from './message';
import PinnedMessage from './pinnedMessage';
import Poll, { pollRef } from './poll';
import User from './user';

@model('Channel')
export default class Channel extends Model({
  name: prop<string>(() => ''),
  id: prop<string>(),
  externalId: prop<string>(''),
  type: prop<ChannelTypeEnum>(ChannelTypeEnum.Public),
  messages: prop(() => objectMap<Message>()),
  users: prop(() => objectMap<Ref<User>>()),
  polls: prop<Poll[]>(() => []),
  activePoll: prop<Ref<Poll> | undefined>(() => undefined).withSetter(),
  pinnedMessages: prop<PinnedMessage[]>(() => []),
}) {
  @modelAction
  addMessages(messages: IRChannelMessage[]): number {
    let newMessages = 0;
    messages.forEach((message, index, array) => {
      // temporary fix
      // upd: TODO investigate and remove this fix
      if (!(message.type === MessageTypeEnum.System && !message.meta)) {
        if (!this.messages.has(message.id)) {
          newMessages += 1;
        }

        const messageModel = new Message({
          id: message.id,
          text: message.text,
          type: message.type,
          createdAt: message.createdAt,
          user: message.userId ? getRoot(this).chat.createUserRef(message.userId) : null,
          meta: message.meta,
          systemData: null,
        });

        if (message.type === MessageTypeEnum.System) {
          messageModel.loadSystemData(getRoot(this), message.meta.event as SystemMessageEnum, message.meta.data);
        }

        this.messages.set(message.id, messageModel);
      }
    });

    return newMessages;
  }

  @modelAction
  setPollList(items: IServerPoll[]): void {
    const serverPolls = items.map(convertServerPollToModel).filter((item) => !this.polls.find((x) => x.id === item.id));
    this.polls = [...serverPolls, ...this.polls];
  }

  @modelAction
  addPoll(poll: IServerPoll): Poll {
    const pollModel = convertServerPollToModel(poll);
    this.polls = [...this.polls, pollModel];

    return pollModel;
  }

  @modelAction
  deletePoll(poll: Poll): void {
    if (poll.id === this.activePoll?.current.id) this.activePoll = undefined;
    this.polls = this.polls.filter((p) => p.id !== poll.id);
  }

  @modelAction
  startPoll(poll?: Poll): void {
    if (!poll) return;

    this.setActivePoll(pollRef(poll));
  }

  @modelAction
  setPollVoted(payload: string[], options: IServerPollOption[]): void {
    if (!this.activePoll) return;

    if (this.activePoll.current.isOpenEnded) {
      this.activePoll.current.isVoted = true;
      return;
    }
    this.activePoll.current.options = options;

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
  stopPoll(poll?: Poll): void {
    if (!poll) return;
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

  @modelAction
  setPinnedMessages(items: IRPinnedMessage[]): void {
    this.pinnedMessages = items.map(
      (item) =>
        new PinnedMessage({
          ...item,
          id: `${item.id}`,
          user: getRoot(this).chat.createUserRef(item.message.userId),
        }),
    );
  }

  @modelAction
  cleanAllMessages(): void {
    this.messages.clear();
  }

  @modelAction
  deleteMessages(ids: number[]): void {
    ids.forEach((id) => {
      const messageToDelete = this.messages.get(`${id}`);
      if (messageToDelete) {
        this.messages.delete(messageToDelete.id);
      }
    });
  }

  @modelAction
  getLastPollByTemplateId(templateId?: string) {
    if (!templateId) return undefined;

    return this.polls.filter((p) => p.templateId === +templateId).sort(sortPollDesc)![0];
  }
  @modelAction
  findPollById(pollId?: string) {
    if (!pollId) return undefined;
    return this.polls.find((p) => p.id === pollId);
  }
  @modelAction
  getPollListByTemplateId(templatePoll?: Poll) {
    if (!templatePoll) return undefined;

    return this.polls.filter((p) => `${p.templateId}` === templatePoll?.id).sort(sortPollDesc);
  }

  @computed
  get sortedMessages(): Message[] {
    return Array.from(this.messages.values()).sort((a: Message, b: Message) =>
      compareAsc(new Date(a.createdAt), new Date(b.createdAt)),
    );
  }

  findLastMessageForUser(msgIdx: number): Message | undefined {
    return this.sortedMessages
      .slice(msgIdx)
      .find((msg, idx, arr) => arr[idx + 1]?.user?.current.id !== msg?.user?.current.id);
  }

  @computed
  get lastMessage(): Message | undefined {
    return [...this.sortedMessages].reverse().find((m) => m.type !== MessageTypeEnum.System);
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

  @computed
  get isPollsInProgress(): boolean {
    return Boolean(this.polls.find(({ status }) => status === IPollStatus.InProgress));
  }

  @computed
  get getPinnedMessages(): PinnedMessage[] {
    return Array.from(this.pinnedMessages.values());
  }

  @computed
  get lastPinnedMessage(): PinnedMessage {
    const pinnedMessages = this.getPinnedMessages;
    return pinnedMessages[pinnedMessages.length - 1];
  }

  @computed
  get getPollTemplates(): Poll[] {
    return this.polls.filter((poll) => poll.templateId === null).sort(sortPollDesc);
  }

  @computed
  get getPollList(): Poll[] {
    return this.polls;
  }

  @modelAction
  findMessageIdx(messageId: number): number {
    return Array.from(this.messages.values()).findIndex((msg) => +msg.id === messageId);
  }
}
