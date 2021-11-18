import PersonIcon from '@mui/icons-material/Person';
import { IconButton, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { FC, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Input } from 'ui-kit';
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
  const intl = useIntl();
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
        <Input placeholder={intl.formatMessage({ id: 'search' })} onChange={setSearch} value={search} />
        <IconButton>
          <SearchIcon fill={COLOURS.BLACK_01} />
        </IconButton>
      </div>
      <div className={classes.userCounter}>
        <PersonIcon fill={COLOURS.BLACK_01} />
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
