import ChannelUsers from 'components/ChannelUsers';
import ChatHeader from 'components/Header';
import SubHeader from 'components/SubHeader';
import { observer } from 'mobx-react-lite';
import React from 'react';
import useStores from 'stores/rootStore';

const PageUsersList = () => {
  const { channelsStore, chatStore } = useStores();
  const channelId = Number(chatStore.params.id);

  const currentChannel = channelsStore.getChannel(channelId);
  if (!currentChannel) {
    return null;
  }

  // const users = chatStore.getUsers(currentChannel.userIds);

  const onBack = () => {
    // todo implement history
    chatStore.redirectToInitial();
  };

  return (
    <>
      <ChatHeader title="Chat" />
      <SubHeader onBack={onBack}>
        <div>Users list</div>
      </SubHeader>
      {/* <ChannelUsers list={users} /> */}
    </>
  );
};

export default observer(PageUsersList);
