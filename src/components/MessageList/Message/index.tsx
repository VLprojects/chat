import cls from 'classnames';
import { format } from 'date-fns';
import React, { FC } from 'react';
import { Avatar } from 'ui-kit';
import { IUser } from '../../../stores/profileStore/types';
import styles from './Message.module.scss';

interface MessageProps {
  own?: boolean;
  user?: IUser;
  message: string;
  date?: string;
  isNew?: boolean;
  type?: 'system';
  short?: boolean;
}

const Message: FC<MessageProps> = (props) => {
  const { own = false, user, message = '', date = '', isNew = false, type = '', short = false } = props;

  return (
    <>
      {!short && (
        <div className={cls(styles.messageInfo, { [styles.messageInfoOwn]: own })}>
          <Avatar url={user?.avatarUrl} size="large" />
          <span className={styles.displayName}>{user?.displayName}</span>

          <span className={styles.time} title={format(new Date(date), 'MM/dd/yyyy, HH:mm')}>
            {format(new Date(date), 'HH:mm')}
          </span>
        </div>
      )}

      <div style={{ display: 'flex' }}>
        <div className={cls(styles.message, styles.userMessage)}>{message}</div>
      </div>
    </>
  );
};

export default Message;
