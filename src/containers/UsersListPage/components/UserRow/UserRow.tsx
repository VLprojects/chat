import { Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Avatar } from 'ui-kit';
import SendMessageIcon from 'ui-kit/icons/SendMessageIcon';
import User from '../../../../keystone/chat/user';
import useStyles from './styles';

interface IProps {
  user: User;
  displayDirect: boolean;
  openNewChat: (user: User) => Promise<void>;
}
const UserRow: React.FC<IProps> = (props) => {
  const { user, displayDirect, openNewChat } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const clickHandler = async () => {
    try {
      setLoading(true);
      await openNewChat(user);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container className={classes.userRow} alignItems="center">
      <Grid item component={Avatar} size="lg" src={user?.avatarUrl} />
      <Grid item component={Typography} style={{ marginLeft: 9 }}>
        {user.displayName}
      </Grid>
      {displayDirect && (
        <Grid item className={classes.sendMessageBtn} id="sendMessageBtn" onClick={clickHandler}>
          {loading ? 'Loading' : <SendMessageIcon />}
        </Grid>
      )}
    </Grid>
  );
};

export default UserRow;
