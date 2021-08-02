import React, { FC } from 'react';
import { Button } from 'ui-kit';
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
      {list &&
        list.map((item: IChannel) => (
          <div className={styles.channelRow} onClick={() => (item.type ? onSelected(item.id) : onJoined(item.id))}>
            <span className={styles.channelTitle}>{item.name}</span>
            {item.type ? (
              <div className={styles.counter}>{item.messages.length}</div>
            ) : (
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
            )}
          </div>
        ))}
    </div>
  );
};

export default ChannelList;
