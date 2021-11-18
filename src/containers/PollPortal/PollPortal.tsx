import { Grid, IconButton, Portal, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import useKeystone from '../../keystone';
import { POLL_CONTAINER } from '../../types/const';
import { UserRoleEnum } from '../../types/enums';
import { IPollStatus } from '../../types/types';
import CloseButton from './components/CloseButton';
import PollVariant from './components/PollVariant';
import ResultVariant from './components/ResultVariant';
import useStyles from './styles';

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
  const isModerator = auth.me.role === UserRoleEnum.Moderator;

  if (!poll) return null;
  if (isModerator && poll.status !== IPollStatus.Done) return null;

  const isVoted = poll.options.find((option) => option.isVoted);

  const onClose = () => currentChannel.closePollPortal();

  return (
    <Portal container={ref.current}>
      <div className={classes.root}>
        <Grid container alignItems="flex-start" justifyContent="space-between" wrap="nowrap">
          <Grid item component={Typography} variant="h4">
            {poll?.question}
          </Grid>
          <Grid item component={IconButton} style={{ padding: 0 }} onClick={onClose}>
            <CloseButton />
          </Grid>
        </Grid>
        <Typography color="text.pollSecondary">
          <FormattedMessage id="poll" />
        </Typography>
        {isVoted || isModerator ? <ResultVariant poll={poll} /> : <PollVariant poll={poll} channel={currentChannel} />}
      </div>
    </Portal>
  );
};

export default observer(PollPortal);
