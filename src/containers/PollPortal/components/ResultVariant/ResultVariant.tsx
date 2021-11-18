import { Box, Theme, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import useKeystone from '../../../../keystone';
import Poll from '../../../../keystone/chat/poll';
import { COLOURS } from '../../../../theme/consts';

interface IProps {
  poll: Poll;
}
const successColor = '#23BE33';
const errorColor = '#FC2F2F';
const votedColor = '#A836AF';
const otherAnswerColor = '#CCD3D9';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      borderRadius: 10,
      background: COLOURS.SURFACE_SECONDARY,
      padding: 0,
      margin: 0,
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    progressLine: {
      borderRadius: 10,
      margin: 0,
    },
    text: {
      padding: '2px 8px',
      color: '#fff',
    },
    totalCounter: {
      position: 'absolute',
      right: 10,
    },
  }),
);

const PollVariant: FC<IProps> = () => {
  const root = useKeystone();
  const { ui, chat } = root;

  const channelId = String(ui.params.id);
  const currentChannel = chat.channels.get(channelId);
  const poll = currentChannel?.getActivePoll;

  const classes = useStyles();

  if (!poll) return null;

  const countTotal = poll.options.reduce((acc, curr) => acc + curr.votesCount, 0);

  return (
    <>
      {poll.options.map((option) => {
        let bgColor = 'inherit';
        bgColor = poll.withAnswer && option.valid ? successColor : errorColor;
        bgColor = !poll.withAnswer && option.isVoted ? votedColor : otherAnswerColor;

        return (
          <Box key={option.id} width="100%" bgcolor={option.isVoted ? 'green' : '#CCD3D9'} className={classes.progress}>
            <Box
              width={`${(option.votesCount / countTotal) * 100}%`}
              bgcolor={option.votesCount ? bgColor : COLOURS.SURFACE_SECONDARY}
              className={classes.progressLine}
            >
              <Typography variant="subtitle2" className={classes.text}>
                {option.option}
              </Typography>
            </Box>
            <span className={classes.totalCounter}>{option.votesCount}</span>
          </Box>
        );
      })}
    </>
  );
};

export default observer(PollVariant);
