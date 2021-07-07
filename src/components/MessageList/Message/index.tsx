import React, { FC, useState, useEffect } from 'react';
import { format, formatDistanceToNow } from 'date-fns';

import { Avatar } from 'ui-kit';

import { TUser } from 'types/users';

import styles from './Message.module.scss';

interface MessageProps {
  own?: boolean;
  user?: TUser;
  message: string;
  date?: string;
  isNew?: boolean;
  type?: 'system';
}

const Message: FC<MessageProps> = ({
  own = false,
  user,
  message = '',
  date = '',
  isNew = false,
  type = '',
}) => {
  const [timeDistance, setTimeDistance] = useState(formatDistanceToNow(new Date(date), { addSuffix: true }));
  let interval: any;

  useEffect(() => {
    interval = setInterval(() => {
      const f = formatDistanceToNow(new Date(date), { addSuffix: true });
      setTimeDistance(f);
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={[
        styles.message,
        own ? styles.own : '',
        isNew ? styles.isNew : '',
        styles[type],
      ].join(' ')}
    >
      <div className={styles.avatar}>
        <Avatar username={user?.username} url={user?.avatarUrl} />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.name}>
          <div className={styles.username}>{user?.username}</div>
          {timeDistance && (
            <span className={styles.time} title={format(new Date(date), 'MM/dd/yyyy, HH:mm')}>{timeDistance}</span>
          )}
        </div>
        <div className={styles.text}>{message}</div>
      </div>
    </div>
  );
};

export default Message;
