import MessageInput from 'components/MessageInput';
import MessageList from 'components/MessageList';
import PinnedMessageList from 'components/PinnedMessageList';
import useKeystone from 'keystone';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';

import { ChannelTypeEnum, UserRoleEnum } from '../../types/enums';
import PollPortal from '../PollPortal';
import ChannelPageHeader from './components/ChannelPageHeader';
import { getPinnedMessages } from './service';

const ChannelPage: FC = () => {
  const root = useKeystone();
  const { auth } = root;

  const currentChannel = root.currentChannel;

  useEffect(() => {
    currentChannel?.id && getPinnedMessages(root, currentChannel?.id);
  }, []);

  if (!currentChannel) {
    return null;
  }

  const isModerator = auth.me.role === UserRoleEnum.Moderator;
  const isPublic = currentChannel.type === ChannelTypeEnum.Public;

  return (
    <>
      <ChannelPageHeader currentChannel={currentChannel} isModerator={isModerator} />
      {isPublic && <PinnedMessageList />}
      <MessageList channelId={currentChannel?.id} />

      <MessageInput channelId={currentChannel?.id} isModerator={isModerator} isPublic={isPublic} />

      <PollPortal />
    </>
  );
};

export default observer(ChannelPage);
