import IconButton from '@mui/material/IconButton';
import Portal from '@mui/material/Portal';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import CloseCircleIcon from 'ui-kit/icons/CloseCircleIcon';
import { getPollType } from 'utils/helper';

import useKeystone from '../../keystone';
import { POLL_CONTAINER } from '../../types/const';
import { IPollStatus } from '../../types/types';
import PollVariant from './components/PollVariant';
import ResultVariant from './components/ResultVariant';
import useStyles from './styles';

const PollPortal: FC = () => {
  const classes = useStyles();
  const root = useKeystone();
  const { auth } = root;

  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ref.current = document.getElementById(POLL_CONTAINER);
  }, []);

  const currentChannel = root.currentChannel;
  if (!currentChannel) return null;

  const poll = currentChannel.getActivePoll;

  if (!poll) return null;

  const isVoted = poll.options.find((option) => option.isVoted) || poll.isVoted;

  const onClose = () => currentChannel.closePollPortal();

  return (
    <Portal container={ref.current}>
      <div className={classes.root}>
        <Box position="relative">
          <Typography variant="h2" sx={{ wordBreak: 'break-word', marginRight: '5px' }}>
            {poll?.question}
          </Typography>

          <IconButton onClick={onClose} sx={{ position: 'absolute', right: -60, top: -30 }}>
            <CloseCircleIcon />
          </IconButton>

          <Typography color="text.pollSecondary" marginBottom="16px">
            <FormattedMessage id={getPollType(poll)} />
          </Typography>
          {isVoted || (auth.isModerator && poll.status === IPollStatus.Done) ? (
            <ResultVariant poll={poll} />
          ) : (
            <PollVariant poll={poll} channel={currentChannel} />
          )}
        </Box>
      </div>
    </Portal>
  );
};

export default observer(PollPortal);
