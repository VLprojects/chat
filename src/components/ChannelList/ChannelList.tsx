import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Button } from 'ui-kit';
import useKeystone from '../../keystone';
import { joinChannel } from '../../keystone/service';
import Routes from '../../routes';
import useStyles from './styles';

const ChannelList: FC = () => {
  const root = useKeystone();
  const classes = useStyles();

  const goToChannel = (id: string) => root.ui.setRoute(`${Routes.Channels}/${id}`);

  const onChannelClick = (id: string): void => goToChannel(id);

  const onPubClick = async (id: string) => {
    await joinChannel(root, id);
    goToChannel(id);
  };

  return (
    <div className={classes.channelsList}>
      {root.chat.publicChannelsList.map((item) => (
        <div key={item.id} className={classes.channelRow} onClick={() => onChannelClick(item.id)}>
          <Typography variant="subtitle1">{item.name}</Typography>
          <div className={classes.counter}>{item.messagesCount}</div>
        </div>
      ))}
      {root.chat.pubsList.map((item) => (
        <div key={item.id} className={classes.channelRow}>
          <Typography variant="subtitle1">{item.name}</Typography>
          <Button onClick={() => onPubClick(item.id)} variant="contained" size="small">
            Join
          </Button>
        </div>
      ))}
    </div>
  );
};

export default observer(ChannelList);
