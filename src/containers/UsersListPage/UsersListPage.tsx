import { observer } from 'mobx-react-lite';
import React from 'react';
import SubHeader from '../../components/SubHeader';
import useKeystone from '../../keystone';
import UserList from './components/UserList';

const UsersListPage = () => {
  const { ui } = useKeystone();

  return (
    <>
      <SubHeader onBack={() => ui.back()}>
        <div>Users list</div>
      </SubHeader>
      <UserList />
    </>
  );
};

export default observer(UsersListPage);
