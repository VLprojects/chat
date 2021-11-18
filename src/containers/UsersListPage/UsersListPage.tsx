import { Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import SubHeader from '../../components/SubHeader';
import useKeystone from '../../keystone';
import User from '../../keystone/chat/user';
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
        <Typography variant="h4">
          <FormattedMessage id="userList" />
        </Typography>
      </SubHeader>
      <UserList users={users} />
    </>
  );
};

export default observer(UsersListPage);
