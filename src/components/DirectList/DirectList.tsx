import { Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import useKeystone from 'keystone';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useState } from 'react';
import Routes from 'routes';

import DirectListRow from './components/DirectListRow';
import { getChatWithUser, getDirectChannelName, getDirectsList } from './service';

const SkeletonPage: React.FC = () => {
  return (
    <Stack spacing={1} flexGrow={1} padding="20px 12px" rowGap={2}>
      <Grid item container wrap="nowrap" columnGap={1}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width="200px" />
      </Grid>
      <Grid item container wrap="nowrap" columnGap={1}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width="200px" />
      </Grid>
      <Grid item container wrap="nowrap" columnGap={1}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width="200px" />
      </Grid>
      <Grid item container wrap="nowrap" columnGap={1}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width="200px" />
      </Grid>
    </Stack>
  );
};

const DirectList: FC = () => {
  const root = useKeystone();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await getDirectsList(root);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const clickRowHandler = useCallback((channelId: string) => root.ui.setRoute(`${Routes.Channels}/${channelId}`), []);
  const channels = root.chat.directChannelsList;

  if (loading && !channels.length) return <SkeletonPage />;

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
