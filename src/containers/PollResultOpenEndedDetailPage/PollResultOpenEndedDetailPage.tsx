import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/system/colorManipulator';
import PollStatusBadge from 'components/PollStatusBadge';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { COLOURS } from 'theme/consts';
import { formatDate } from 'utils/date';
import { getPollType } from 'utils/helper';
import SubHeader from '../../components/SubHeader';
import useKeystone from '../../keystone';
import HeaderTitle from '../../ui-kit/HeaderTitle';

const PollResultOpenEndedDetailPage: FC = () => {
  const root = useKeystone();
  const { ui } = root;

  const pollId = String(ui.params.pollId);
  const currentChannel = root.currentChannel;
  const poll = currentChannel?.findPollById(pollId);

  return (
    <>
      <SubHeader onBack={() => ui.back()}>
        <HeaderTitle title={currentChannel?.name} />
      </SubHeader>
      <Grid container direction="column" overflow="auto" paddingTop="24px" wrap="nowrap">
        <Grid item component={Typography} variant="h2" alignSelf="center">
          <FormattedMessage id="poll.answers" values={{ number: poll?.votes.length }} />
        </Grid>
        <PollStatusBadge status={poll?.status} alignSelf="start" marginTop="49px" mb="12px" marginLeft="16px" />
        <Typography variant="h2" alignSelf="start" margin="0px 20px" sx={{ wordBreak: 'break-all' }}>
          {poll?.question}
        </Typography>
        <Typography
          variant="body2"
          alignSelf="start"
          color={alpha(COLOURS.BLACK_02, 0.6)}
          marginLeft="20px"
          marginTop="6px"
          marginBottom="20px"
        >
          <FormattedMessage id={getPollType(poll)} />
        </Typography>
        {poll?.votes.map((vote) => (
          <Paper sx={{ backgroundColor: COLOURS.LIGHT_04, margin: '0px 12px 13px' }} elevation={0}>
            <Grid container justifyContent="space-between" padding="16px 12px">
              <Typography variant="h4">{vote.user.displayName}</Typography>
              <Typography variant="subtitle2" color={alpha(COLOURS.BLACK_01, 0.5)}>
                {formatDate(poll.stoppedAt || poll.createdAt)}
              </Typography>
            </Grid>
            <Divider />
            <Typography margin="12px" variant="subtitle2">
              {vote.answer}
            </Typography>
          </Paper>
        ))}
      </Grid>
    </>
  );
};

export default PollResultOpenEndedDetailPage;
