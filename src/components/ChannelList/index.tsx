import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'ui-kit';
import useKeystone from '../../keystone';
import Routes from '../../routes';
import { joinChannel } from '../../keystone/service';
import useStyles from './styles';

const ChannelList: FC = () => {
  const root = useKeystone();
  const classes = useStyles();

  const onChannelClick = (id: string): void => {
    root.ui.setRoute(`${Routes.Channels}/${id}`);
  };

  const onPubClick = (id: string): Promise<void> => joinChannel(root, id);

  return (
    <div className={classes.channelsList}>
      {root.chat.channelsList.map((item) => (
        <div key={item.id} className={classes.channelRow} onClick={() => onChannelClick(item.id)}>
          <span className={classes.channelTitle}>{item.name}</span>
          <div className={classes.counter}>{item.messagesCount}</div>
        </div>
      ))}
      {root.chat.pubsList.map((item) => (
        <div key={item.id} className={classes.channelRow}>
          <span className={classes.channelTitle}>{item.name}</span>
          <Button onClick={() => onPubClick(item.id)} variant="contained" size="small">
            Join
          </Button>
        </div>
      ))}
    </div>
  );
};

export default observer(ChannelList);
