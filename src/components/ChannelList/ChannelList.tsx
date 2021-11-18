import { Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Button } from 'ui-kit';
import useKeystone from '../../keystone';
import { joinChannel } from '../../keystone/service';
import Routes from '../../routes';
import LastMessage from './components/LastMessage';
import useStyles from './styles';

const ChannelList: FC = () => {
  const root = useKeystone();
  const classes = useStyles();

  const goToChannel = (id: string) => root.ui.setRoute(`${Routes.Channels}/${id}`);

  const onPubClick = (id: string) => async () => {
    await joinChannel(root, id);
    goToChannel(id);
  };

  return (
    <div className={classes.channelsList}>
      {root.chat.publicChannelsList.map((item) => (
        <LastMessage key={item.id} channel={item} />
      ))}
      {root.chat.pubsList.map((item) => (
        <Grid container key={item.id} alignItems="center" justifyContent="space-between" sx={{ padding: '12px 16px' }}>
          <Typography variant="subtitle2">{item.name}</Typography>
          <Button onClick={onPubClick(item.id)} variant="contained" size="small">
            Join
          </Button>
        </Grid>
      ))}
    </div>
  );
};

export default observer(ChannelList);
