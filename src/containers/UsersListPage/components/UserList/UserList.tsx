import { observer } from 'mobx-react-lite';
import React, { FC, useMemo, useState } from 'react';
import { Image, Input } from 'ui-kit';
import ChatUsersIcon from 'ui-kit/assets/icons/chat-users.svg';
import IconSearch from 'ui-kit/assets/icons/icon-search.svg';
import useKeystone from '../../../../keystone';
import User from '../../../../keystone/chat/user';
import { createOrOpenDirectChat } from '../../services';
import UserRow from '../UserRow';
import useStyles from './styles';

type Props = {
  users: User[];
};

const UserList: FC<Props> = (props) => {
  const classes = useStyles();

  const root = useKeystone();
  const { settings } = root;

  const [search, setSearch] = useState('');

  const { users } = props;

  const filteredUsers = useMemo(
    () => (search ? users.filter((user) => user.displayName.includes(search)) : users),
    [search],
  );

  const openNewChat = (chatWithUser: User) => createOrOpenDirectChat(root, chatWithUser);

  return (
    <div className={classes.root}>
      <div className={classes.inputSearch}>
        <Input placeholder="Search" onChange={(v) => setSearch(v)} value={search} />
        <button type="button">
          <Image src={IconSearch} alt="" />
        </button>
      </div>
      <div className={classes.userCounter}>
        <Image src={ChatUsersIcon} alt="" />
        <span style={{ marginLeft: 8 }}>{filteredUsers.length}</span>
      </div>
      <div className={classes.userListWrapper}>
        {filteredUsers.map((user) => (
          <UserRow key={user.id} user={user} displayDirect={settings.displayDirect} openNewChat={openNewChat} />
        ))}
      </div>
    </div>
  );
};

export default observer(UserList);
