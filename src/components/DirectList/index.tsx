import React, { FC } from 'react';

import styles from './ChannelsDirectList.module.scss';

interface IChannelsList {
  list: [],
  onSelected: (id: number) => void,
}

type TDirectListUser = {
  id: number,
  username: string,
  about: string,
  online: string,
};

const ChannelsList: FC<IChannelsList> = (props) => {
  const { list, onSelected } = props;

  return (
    <div className={styles.directList}>
      {list && (
        <ul>
          {list.map((item: TDirectListUser) => (
            <li
              aria-hidden="true"
              onClick={() => onSelected(item.id)}
            >
              <div className={styles.wrapper}>
                <div className={styles.username}>{item.username}</div>
                <div className={styles.about}>{item.about}</div>
              </div>
              <div className={styles.status}>
                <div className={item.online ? styles.online : ''} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChannelsList;
