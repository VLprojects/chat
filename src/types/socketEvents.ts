enum SocketEventsEnum {
  Message = 'message',
  SystemMessage = 'system:message',
  NewPublic = 'new-public',
  NewChannelUser = 'new-channel-user',
  NewDirect = 'new-direct',
  PollStart = 'poll-start',
  PollStop = 'poll-stop',
  PollVote = 'poll-vote',
  UserUpdateProfile = 'user-update-profile',
  MessagePinned = 'message-pinned',
  DeleteMessages = 'delete-messages',
  CleanChannelMessages = 'сlean-channel-messages',
}

export default SocketEventsEnum;
