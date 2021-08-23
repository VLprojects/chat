import { observer } from 'mobx-react-lite';
import cls from 'classnames';
import { format } from 'date-fns';
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
        <div className={cls(classes.messageInfo, { [classes.messageInfoOwn]: own })}>
          <Avatar url={user?.avatarUrl} size="large" />
          <span className={classes.displayName}>{user?.displayName}</span>

          <span className={classes.time} title={format(new Date(date), 'MM/dd/yyyy, HH:mm')}>
            {format(new Date(date), 'HH:mm')}
          </span>
        </div>
      )}

      <div style={{ display: 'flex' }} className={cls({ [classes.messageInfoOwn]: own })}>
        <div className={cls(classes.message, classes.userMessage, { [classes.userMessageOwn]: own })}>{message}</div>
      </div>
    </>
  );
};

export default observer(UserMessage);
