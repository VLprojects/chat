import { Grid, IconButton, Portal, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import useKeystone from '../../keystone';
import { POLL_CONTAINER } from '../../types/const';
import CloseButton from './components/CloseButton';
import PollVariant from './components/PollVariant';
import ResultVariant from './components/ResultVariant';
import useStyles from './styles';
import { IPollStatus } from '../../types/types';

const PollPortal: FC = () => {
  const classes = useStyles();
  const root = useKeystone();
  const { ui, chat, auth } = root;

  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ref.current = document.getElementById(POLL_CONTAINER);
  }, []);

  const currentChannel = chat.channels.get(`${ui.params.id}`);
  if (!currentChannel) return null;

  const poll = currentChannel.getActivePoll;

  if (!poll) return null;

  const isVoted = poll.options.find((option) => option.isVoted) || poll.isVoted;

  const onClose = () => currentChannel.closePollPortal();

  return (
    <Portal container={ref.current}>
      <div className={classes.root}>
        <Grid container alignItems="flex-start" justifyContent="space-between" wrap="nowrap">
          <Grid item>
            <Typography variant="h4" sx={{ wordBreak: 'break-all', marginRight: '5px' }}>
              {poll?.question}
            </Typography>
          </Grid>
          <Grid item component={IconButton} style={{ padding: 0 }} onClick={onClose}>
            <CloseButton />
          </Grid>
        </Grid>
        <Typography color="text.pollSecondary">
          <FormattedMessage id="poll" />
        </Typography>
        {isVoted || (auth.isModerator && poll.status === IPollStatus.Done) ? (
          <ResultVariant poll={poll} />
        ) : (
          <PollVariant poll={poll} channel={currentChannel} />
        )}
      </div>
    </Portal>
  );
};

export default observer(PollPortal);
