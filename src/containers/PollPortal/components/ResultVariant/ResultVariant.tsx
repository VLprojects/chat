import { Box, Grid, Theme, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import useKeystone from '../../../../keystone';
import Poll from '../../../../keystone/chat/poll';
import { COLOURS } from '../../../../theme/consts';
import { FormattedMessage } from 'react-intl';

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
      maxWidth: '100%',
    },
    text: {
      padding: '2px 25px 2px 8px',
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

  if (poll.isOpenEnded) {
    return (
      <Grid mt={4} container alignItems="center" direction="column" rowGap={2}>
        <Typography variant="h2">
          <FormattedMessage id="thanks" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id="answerAccepted" />
        </Typography>
      </Grid>
    );
  }

  return (
    <>
      {poll.options.map((option) => {
        let bgColor: string;
        if (poll.withAnswer) {
          bgColor = option.valid ? successColor : errorColor;
        } else {
          bgColor = option.isVoted ? votedColor : otherAnswerColor;
        }

        return (
          <Box
            key={option.id}
            width="100%"
            bgcolor={option.isVoted ? 'green' : '#CCD3D9'}
            className={classes.progress}
            data-qa-votes={option.votesCount}
            data-qa-option={option.option}
          >
            <Box
              width={option.votesCount ? `${(option.votesCount / countTotal) * 100}%` : '100%'}
              bgcolor={option.votesCount ? bgColor : COLOURS.SURFACE_SECONDARY}
              className={classes.progressLine}
            >
              <Typography
                variant="subtitle2"
                className={classes.text}
                noWrap
                color={option.votesCount ? '#fff' : 'black'}
              >
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
