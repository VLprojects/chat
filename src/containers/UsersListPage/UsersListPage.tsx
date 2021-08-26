import { observer } from 'mobx-react-lite';
import React from 'react';
import User from '../../keystone/chat/user';
import SubHeader from '../../components/SubHeader';
import useKeystone from '../../keystone';
import UserList from './components/UserList';

const UsersListPage = () => {
  const { ui, chat } = useKeystone();

  let users: User[];

  const channelId = String(ui.params.id);
  const currentChannel = chat.channels.get(channelId);
  if (currentChannel) {
    users = currentChannel.userList;
  } else {
    users = chat.userList;
  }

  return (
    <>
      <SubHeader onBack={() => ui.back()}>
        <div>Users list</div>
      </SubHeader>
      <UserList users={users} />
    </>
  );
};

export default observer(UsersListPage);
