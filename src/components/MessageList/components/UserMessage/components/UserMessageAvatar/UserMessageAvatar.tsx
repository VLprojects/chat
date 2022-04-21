import Grid from '@mui/material/Grid';
import React from 'react';
import User from 'keystone/chat/user';
import { Avatar } from 'ui-kit';
import { observer } from 'mobx-react';

interface IProps {
  user: User;
}
const UserMessageAvatar: React.FC<IProps> = (props) => {
  const { user } = props;

  return (
    <Grid
      item
      component={Avatar}
      name={user.displayName}
      src={user.avatarUrl}
      size="lg"
      avatarColor={user?.getAvatarColor}
    />
  );
};

export default observer(UserMessageAvatar);
