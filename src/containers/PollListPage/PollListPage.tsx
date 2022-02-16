import { Divider, Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import React, { FC, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import HeaderTitle from 'ui-kit/HeaderTitle';
import SubHeader from '../../components/SubHeader';
import useKeystone from '../../keystone';
import Poll from '../../keystone/chat/poll';
import Routes from '../../routes';
import { Button } from '../../ui-kit';
import PollPortal from '../PollPortal';
import PollCard from './components/PollCard';
import { deletePoll, getPollListForChannel } from './services';
import { COLOURS } from '../../theme/consts';
import EmptyPollIcon from '../../ui-kit/icons/EmptyPollIcon';

const PollListPage: FC = () => {
  const root = useKeystone();
  const { ui, chat } = root;

  const channelId = String(ui.params.id);
  const currentChannel = chat.channels.get(channelId);

  useEffect(() => {
    async function getList() {
      const response = await getPollListForChannel(+channelId);
      currentChannel?.setPollList(response);
    }

    getList();
  }, []);

  const onCreatePoll = () => {
    ui.setRoute(`${Routes.CreatePoll}/${channelId}/${undefined}`);
  };

  const onDeletePoll = (poll: Poll) => {
    deletePoll(+poll.id);
    currentChannel?.deletePoll(poll);
  };

  if (!currentChannel) {
    return null;
  }

  const renderPollsList = () => {
    return currentChannel.polls
      .slice()
      .filter((poll) => poll.templateId !== null)
      .sort((a, b) => +b.id - +a.id)
      .map((poll) => (
        <Grid key={poll.id} item xs={12}>
          <PollCard key={`${poll.question}-${poll.id}`} poll={poll} onDelete={onDeletePoll} />
        </Grid>
      ));
  };

  const renderPollTemplates = () => {
    return currentChannel.polls
      .slice()
      .filter((poll) => poll.templateId === null)
      .map((poll) => {
        return (
          <Grid key={poll.id} item xs={12}>
            <PollCard key={`${poll.question}-${poll.id}`} poll={poll} onDelete={onDeletePoll} />
          </Grid>
        );
      });
  };

  return (
    <>
      <SubHeader onBack={() => ui.back()}>
        <HeaderTitle title={currentChannel?.name} />
      </SubHeader>

      <Grid container overflow="auto" pt="32px" px="24px" height={!currentChannel.polls.length ? '100%' : undefined}>
        <Grid item xs={12} component={Button} variant="outlined" size="large" data-qa="newPoll" onClick={onCreatePoll}>
          <Typography variant="body1">
            <FormattedMessage id="newPoll" />
          </Typography>
        </Grid>

        {!currentChannel.polls.length ? (
          <Grid mt="30px" container rowGap={1.5} direction="column" justifyItems="center" alignItems="center">
            <EmptyPollIcon fill={COLOURS.BLACK_01} />
            <Typography variant="body2" color={COLOURS.LIGHT_02}>
              <FormattedMessage id="listEmpty" />
            </Typography>
          </Grid>
        ) : (
          <Grid container>
            <Grid my={2} item xs={12}>
              <Divider>
                <FormattedMessage id="templates" />
              </Divider>
            </Grid>
            {renderPollTemplates()}
            <Grid my={2} item xs={12}>
              <Divider>
                <FormattedMessage id="polls" />
              </Divider>
            </Grid>
            {renderPollsList()}
          </Grid>
        )}
      </Grid>

      <PollPortal />
    </>
  );
};

export default observer(PollListPage);
