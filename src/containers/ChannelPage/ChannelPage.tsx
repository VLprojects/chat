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
  const { ui, chat, auth } = root;
  const channelId = String(ui.params.id);
  const currentChannel = chat.channels.get(channelId);

  useEffect(() => {
    getPinnedMessages(root, channelId);
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
      <MessageList channelId={channelId} />

      <MessageInput channelId={channelId} isModerator={isModerator} isPublic={isPublic} />

      <PollPortal />
    </>
  );
};

export default observer(ChannelPage);
