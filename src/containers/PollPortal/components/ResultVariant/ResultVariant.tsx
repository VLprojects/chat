import { Box, Grid, lighten, Theme, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import useKeystone from '../../../../keystone';
import Poll from '../../../../keystone/chat/poll';
import { COLOURS } from '../../../../theme/consts';

interface IProps {
  poll: Poll;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      border: `1px solid #F3F2F9`,
      borderRadius: 10,

      padding: 0,
      margin: 0,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    progressLine: {
      borderRadius: 10,
    },
  }),
);

const PollVariant: FC<IProps> = () => {
  const root = useKeystone();
  const { auth } = root;

  const currentChannel = root.currentChannel;
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
      <Grid container direction="column" rowGap={2}>
        {poll.options.map((option) => {
          const bgColorOfScale = () => {
            if (option.valid) {
              return COLOURS.GREEN;
            } else if (option.isVoted) {
              return COLOURS[auth.me.getAvatarColor];
            } else if (option.votesCount > 0) {
              return COLOURS.LIGHT;
            } else {
              return COLOURS.WHITE;
            }
          };

          const getMainBgColor = (color: string) => {
            return color === COLOURS.LIGHT ? COLOURS.WHITE : lighten(color, 0.5);
          };

          return (
            <Grid
              item
              xs
              key={option.id}
              className={classes.progress}
              data-qa-votes={option.votesCount}
              data-qa-option={option.option}
              bgcolor={getMainBgColor(bgColorOfScale())}
            >
              <Typography
                component="span"
                color={option.isVoted || option.valid ? COLOURS.WHITE : COLOURS.BLACK_01}
                fontWeight={500}
                padding="8px 25px 8px 12px"
                zIndex="10"
              >
                {option.option}
              </Typography>
              <Box
                width={option.votesCount ? `${(option.votesCount / countTotal) * 100}%` : '100%'}
                bgcolor={bgColorOfScale()}
                position="absolute"
                minHeight="100%"
                borderRadius="10px"
              ></Box>
              <Typography
                component="span"
                variant="body2"
                position="absolute"
                right="10px"
                color={option.isVoted || option.valid ? lighten(COLOURS.WHITE, 0.5) : COLOURS.BLACK_01}
              >
                {option.votesCount}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default observer(PollVariant);
