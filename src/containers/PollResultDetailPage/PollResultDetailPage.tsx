import React, { FC, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import SubHeader from '../../components/SubHeader';
import HeaderTitle from '../../ui-kit/HeaderTitle';
import { FormattedMessage } from 'react-intl';
import useKeystone from '../../keystone';
import useStyles from './styles';
import PollDetailOpenEnded from './components/PollDetailOpenEnded';
import { getPollById } from '../PollListPage/services';
import { IServerPoll } from '../CreatePollPage/types';
import { COLOURS } from '../../theme/consts';

const PollResultDetailPage: FC = () => {
  const root = useKeystone();
  const { ui, chat } = root;
  const classes = useStyles();
  const channelId = String(ui.params.id);
  const pollId = String(ui.params.pollId);
  const currentChannel = chat.channels.get(channelId);
  const [isLoading, setIsLoading] = useState(true);
  const [poll, setPoll] = useState<IServerPoll>();

  useEffect(() => {
    (async () => {
      await fetchPollWithVotes();
    })();
  }, []);

  const fetchPollWithVotes = async (withLoading: boolean = true) => {
    if (withLoading) setIsLoading(true);
    const responsePoll = await getPollById(+pollId);
    setPoll(responsePoll);
    setIsLoading(false);
  };

  const renderPollDetailOpenEnded = () => {
    return (
      !isLoading &&
      poll?.isOpenEnded &&
      poll?.votes?.map((vote) => {
        return <PollDetailOpenEnded key={vote.id} vote={vote} />;
      })
    );
  };

  return (
    <>
      <SubHeader onBack={() => ui.back()}>
        <HeaderTitle title={currentChannel?.name} />
      </SubHeader>
      <Grid container direction="column" overflow="auto" pt="32px" px="24px">
        <Grid item component={Typography} variant="h3" xs className={classes.headerText}>
          <FormattedMessage id="results" />
        </Grid>

        {!isLoading && !poll?.votes?.length && (
          <Grid mt="30px" container rowGap={1.5} direction="column" justifyItems="center" alignItems="center">
            <Typography variant="body2" color={COLOURS.LIGHT_02}>
              <FormattedMessage id="listEmpty" />
            </Typography>
          </Grid>
        )}

        {renderPollDetailOpenEnded()}
      </Grid>
    </>
  );
};

export default PollResultDetailPage;
