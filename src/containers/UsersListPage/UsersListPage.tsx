import { observer } from 'mobx-react-lite';
import React from 'react';
import ChatHeader from '../../components/Header';
import SubHeader from '../../components/SubHeader';
import useKeystone from '../../keystone';
import Routes from '../../routes';
import UserList from './components/UserList';

const UsersListPage = () => {
  const { ui } = useKeystone();
  // const channelId = String(ui.params.id);

  const onBack = () => {
    ui.setRoute(Routes.Channels);
  };

  return (
    <>
      <ChatHeader title="Chat" />
      <SubHeader onBack={onBack}>
        <div>Users list</div>
      </SubHeader>
      <UserList />
    </>
  );
};

export default observer(UsersListPage);
