import { Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import useKeystone from '../../keystone';
import Routes from '../../routes';
import { Avatar } from '../../ui-kit';
import { getChatWithUser, getDirectChannelName } from './service';
import useStyles from './styles';

const DirectList: FC = () => {
  const classes = useStyles();
  const root = useKeystone();

  const clickRowHandler = (channelId: string) => () => {
    root.ui.setRoute(`${Routes.Channels}/${channelId}`);
  };

  return (
    <Grid container direction="column" spacing={4} style={{ marginTop: 10, flexGrow: 1 }}>
      {root.chat.directChannelsList.map((channel) => {
        const user = getChatWithUser(root, channel.id);

        if (!user) return null;

        return (
          <Grid
            item
            container
            key={channel.id}
            className={classes.row}
            onClick={clickRowHandler(channel.id)}
            alignItems="center"
          >
            <Grid item xs component={Avatar} src={user.avatarUrl} avatarColor={user.avatarColor} size="lg" />
            <Grid item component={Typography} className={classes.channelTitle}>
              {getDirectChannelName(root, channel.id)}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default observer(DirectList);
