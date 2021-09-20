import { Grid, Typography } from '@material-ui/core';
import cls from 'classnames';
import { format, formatDistance, isToday, subDays } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Avatar } from 'ui-kit';
import User from '../../../keystone/chat/user';
import useStyles from './styles';

interface UserMessageProps {
  own?: boolean;
  user?: User;
  message: string;
  date?: string;
  isNew?: boolean;
  type?: 'system';
  short?: boolean;
}

const UserMessage: FC<UserMessageProps> = (props) => {
  const { own = false, user, message = '', date = '', short = false } = props;
  const classes = useStyles();

  return (
    <>
      {!short && (
        <Grid container alignItems="center" direction={own ? 'row-reverse' : 'row'} spacing={2}>
          <Grid item component={Avatar} src={user?.avatarUrl} size="lg" />
          <Grid item component={Typography}>
            {user?.displayName}
          </Grid>

          <span className={classes.time} title={format(new Date(date), 'MM/dd/yyyy, HH:mm')}>
            {isToday(new Date(date))
              ? format(new Date(date), 'HH:mm')
              : formatDistance(subDays(new Date(date), 3), new Date(), { addSuffix: true })}
          </span>
        </Grid>
      )}

      <Grid container alignItems="center" direction={own ? 'row-reverse' : 'row'}>
        <Grid item className={cls(classes.message, classes.userMessage, { [classes.userMessageOwn]: own })}>
          {message}
        </Grid>
      </Grid>
    </>
  );
};

export default observer(UserMessage);
