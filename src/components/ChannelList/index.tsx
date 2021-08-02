import React, { FC } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Button, Image } from 'ui-kit';
import IconLock from 'ui-kit/assets/icons/icon-lock.svg';
import { IChannel } from '../../stores/chatStore/types';
import styles from './ChannelsList.module.scss';

interface IChannelList {
  list: IChannel[];
  onSelected: (id: number) => void;
  onJoined: (id: number) => void;
}

const ChannelList: FC<IChannelList> = (props) => {
  const { list, onSelected, onJoined } = props;

  return (
    <div className={styles.channelsList}>
      <Scrollbars>
        {list && (
          <ul>
            {list.map((item: IChannel) => {
              if (!item.type) {
                return (
                  <li key={item.id}>
                    <div className={styles.wrapper}>
                      <div className={styles.title}>
                        {item.name}
                        <Button
                          onClick={() => {
                            onJoined(item.id);
                            onSelected(item.id);
                          }}
                          variant="contained"
                          size="small"
                        >
                          Join
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li className={styles.channelId} aria-hidden="true" onClick={() => onSelected(item.id)} key={item.id}>
                  <div className={styles.wrapper}>
                    <div className={styles.title}>{item.name}</div>
                    {item.type && (
                      <div className={styles.access}>
                        {item.type === 'private' && (
                          <div className={styles.accessIcon}>
                            <Image src={IconLock} alt="" />
                          </div>
                        )}
                        {item.type}
                      </div>
                    )}
                  </div>
                  {item.messages && item.messages.length > 0 && (
                    <div className={styles.count}>{item.messages.length || ''}</div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Scrollbars>
    </div>
  );
};

export default ChannelList;
