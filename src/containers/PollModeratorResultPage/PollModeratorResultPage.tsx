import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/system/colorManipulator';
import PollStatusBadge from 'components/PollStatusBadge';
import SubHeader from 'components/SubHeader';
import useKeystone from 'keystone';
import { observer } from 'mobx-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { COLOURS } from 'theme/consts';
import HeaderTitle from 'ui-kit/HeaderTitle';
import { getPollType } from 'utils/helper';
import ActionButton from './components/ActionButton';
import PollModeratorResultCard from './components/PollModeratorResultCard';

const PollModeratorResultPage: React.FC = () => {
  const root = useKeystone();
  const { ui } = root;

  const currentChannel = root.currentChannel;
  const pollId = ui.params.pollId;

  const templatePoll = currentChannel?.findPollById(pollId);

  const polls = currentChannel?.getPollListByTemplateId(templatePoll);

  const lastRunningPoll = polls![0];
  const { question, status } = lastRunningPoll;

  if (!lastRunningPoll) return null;

  return (
    <>
      <SubHeader onBack={() => ui.back()}>
        <HeaderTitle title={currentChannel?.name} />
      </SubHeader>
      <Grid container direction="column" wrap="nowrap" overflow="auto" height="100%">
        <Typography variant="h2" marginTop="24px" textAlign="center">
          <FormattedMessage id="poll.results" />
        </Typography>
        <PollStatusBadge status={status} alignSelf="start" marginTop="49px" mb="12px" marginLeft="16px" />

        <Typography variant="h2" alignSelf="start" margin="0px 20px" sx={{ wordBreak: 'break-all' }}>
          {question}
        </Typography>
        <Typography
          variant="body2"
          alignSelf="start"
          color={alpha(COLOURS.BLACK_02, 0.6)}
          marginLeft="20px"
          marginTop="6px"
          marginBottom="20px"
        >
          <FormattedMessage id={getPollType(lastRunningPoll)} />
        </Typography>

        {polls?.map((poll) => (
          <PollModeratorResultCard key={poll.id} poll={poll} />
        ))}
      </Grid>
      <ActionButton activePoll={lastRunningPoll} currentChannel={currentChannel} templatePoll={templatePoll} />
    </>
  );
};

export default observer(PollModeratorResultPage);
