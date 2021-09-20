import { IconButton, Typography } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { FC, useMemo, useState } from 'react';
import { Input } from 'ui-kit';
import ChatUsersIcon from 'ui-kit/icons/ChatUsersIcon';
import SearchIcon from 'ui-kit/icons/SearchIcon';
import useKeystone from '../../../../keystone';
import User from '../../../../keystone/chat/user';
import { COLOURS } from '../../../../theme/consts';
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
        <Input placeholder="Search" onChange={setSearch} value={search} />
        <IconButton>
          <SearchIcon fill={COLOURS.TEXT_PRIMARY} />
        </IconButton>
      </div>
      <div className={classes.userCounter}>
        <ChatUsersIcon fill={COLOURS.TEXT_PRIMARY} />
        <Typography style={{ marginLeft: 8 }}>{filteredUsers.length}</Typography>
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
