import React from 'react';
import { observer } from 'mobx-react-lite';

import ChannelUsers from 'components/ChannelUsers';
import ChatHeader from 'components/Header';
import SubHeader from 'components/SubHeader';

import Routes from 'routes';
import useStores from 'stores/root';

import { getChannelUsers } from 'utils/users';

interface ParamTypes {
  id: string;
}

const PageUsersList = () => {
  const { channelsStore, chatStore } = useStores();
  const { channelId } = chatStore;

  const channelUsersIds: number[] = channelsStore.channels.find(
    (item: any) => item.id === Number(channelId),
  )?.userIds || [];

  const users = getChannelUsers(channelUsersIds, chatStore.users);

  const onBack = () => {
    chatStore.setRoute('');
  };

  return (
    <>
      <ChatHeader title="Chat" />
      <SubHeader onBack={onBack}>
        <div>Users list</div>
      </SubHeader>
      <ChannelUsers list={users} />
    </>
  );
};

export default observer(PageUsersList);
