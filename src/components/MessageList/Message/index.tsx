import { observer } from 'mobx-react-lite';
import { format, formatDistanceToNow } from 'date-fns';
import React, { FC, useEffect, useState } from 'react';
import useStores from 'stores/rootStore';
import { Avatar } from 'ui-kit';
import { IUser } from '../../../stores/profileStore/types';
import styles from './Message.module.scss';

interface MessageProps {
  own?: boolean;
  userId: number;
  message: string;
  date?: string;
  isNew?: boolean;
  type?: 'system';
}

const Message: FC<MessageProps> = ({ own = false, userId, message = '', date = '', isNew = false, type = '' }) => {
  const [timeDistance, setTimeDistance] = useState(formatDistanceToNow(new Date(date), { addSuffix: true }));
  const [user, setUser] = useState<IUser>();
  const { chatStore } = useStores();
  let interval: any;

  useEffect(() => {
    setUser(chatStore.getUsers([userId])[0]);
    interval = setInterval(() => {
      const f = formatDistanceToNow(new Date(date), { addSuffix: true });
      setTimeDistance(f);
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={[styles.message, own ? styles.own : '', isNew ? styles.isNew : '', styles[type]].join(' ')}>
      <div className={styles.avatar}>
        <Avatar username={user?.displayName} url={user?.avatarUrl} />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.name}>
          <div className={styles.username}>{user?.displayName}</div>
          {timeDistance && (
            <span className={styles.time} title={format(new Date(date), 'MM/dd/yyyy, HH:mm')}>
              {timeDistance}
            </span>
          )}
        </div>
        <div className={styles.text}>{message}</div>
      </div>
    </div>
  );
};

export default observer(Message);
