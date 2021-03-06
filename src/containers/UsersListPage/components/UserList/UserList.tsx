import PersonIcon from '@mui/icons-material/Person';
import { Grid, Typography } from '@mui/material';
import useKeystone from 'keystone';
import User from 'keystone/chat/user';
import { observer } from 'mobx-react-lite';
import React, { FC, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { COLOURS } from 'theme/consts';
import { Input } from 'ui-kit';
import SearchIcon from 'ui-kit/icons/SearchIcon';

import { createOrOpenDirectChat } from '../../services';
import UserRow from '../UserRow';

type Props = {
  users: User[];
};

const UserList: FC<Props> = (props) => {
  const intl = useIntl();

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
    <Grid container wrap="nowrap" direction="column" marginTop="20px" marginBottom="20px" overflow="hidden">
      <Grid item padding="0 12px">
        <Input
          placeholder={intl.formatMessage({ id: 'search' })}
          onChange={setSearch}
          value={search}
          rightIcon={<SearchIcon fill={COLOURS.BLACK_01} />}
        />
      </Grid>
      <Grid item container marginTop="20px" marginBottom="20px" padding="0 12px">
        <PersonIcon fill={COLOURS.BLACK_01} />
        <Typography style={{ marginLeft: 8 }}>{filteredUsers.length}</Typography>
      </Grid>
      <Grid item container wrap="nowrap" direction="column" overflow="auto">
        {filteredUsers.map((user) => (
          <UserRow key={user.id} user={user} displayDirect={settings.displayDirect} openNewChat={openNewChat} />
        ))}
      </Grid>
    </Grid>
  );
};

export default observer(UserList);
