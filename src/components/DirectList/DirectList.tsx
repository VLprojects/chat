import { Grid } from '@mui/material';
import useKeystone from 'keystone';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect } from 'react';
import Routes from 'routes';

import DirectListRow from './components/DirectListRow';
import { getChatWithUser, getDirectChannelName, getDirectsList } from './service';

const DirectList: FC = () => {
  const root = useKeystone();

  useEffect(() => {
    getDirectsList(root);
  }, []);

  const clickRowHandler = useCallback((channelId: string) => root.ui.setRoute(`${Routes.Channels}/${channelId}`), []);
  const channels = root.chat.directChannelsList;

  return (
    <Grid container direction="column" flexGrow={1}>
      {channels.map((channel) => {
        const user = getChatWithUser(root, channel.id);
        const directChannelName = getDirectChannelName(root, channel.id);

        if (!user) return null;

        return (
          <DirectListRow
            key={channel.id}
            channel={channel}
            user={user}
            clickRowHandler={clickRowHandler}
            directChannelName={directChannelName}
          />
        );
      })}
    </Grid>
  );
};

export default observer(DirectList);
