import { Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import React, { FC, useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { FormattedMessage } from 'react-intl';
import SubHeader from '../../components/SubHeader';
import useKeystone from '../../keystone';
import Poll from '../../keystone/chat/poll';
import Routes from '../../routes';
import { Button } from '../../ui-kit';
import ChannelName from '../../ui-kit/ChannelName';
import PollPortal from '../PollPortal';
import PollCard from './components/PollCard';
import { deletePoll, getPollListForChannel } from './services';

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
    ui.setRoute(`${Routes.CreatePoll}/${channelId}`);
  };

  const onDeletePoll = (poll: Poll) => {
    deletePoll(+poll.id);
    currentChannel?.deletePoll(poll);
  };

  if (!currentChannel) {
    return null;
  }

  return (
    <>
      <SubHeader onBack={() => ui.back()}>
        <ChannelName name={currentChannel?.name} />
      </SubHeader>
      <Scrollbars autoHide>
        <Grid container direction="column" style={{ padding: '32px 24px' }}>
          <Grid
            item
            component={Button}
            variant="outlined"
            size="large"
            onClick={onCreatePoll}
            style={{ marginBottom: 30 }}
          >
            <Typography variant="body1">
              <FormattedMessage id="newPoll" />
            </Typography>
          </Grid>

          {currentChannel.polls
            .slice()
            .sort((a, b) => +b.id - +a.id)
            .map((poll) => (
              <PollCard key={`${poll.question}-${poll.id}`} poll={poll} onDelete={onDeletePoll} />
            ))}
        </Grid>
      </Scrollbars>

      <PollPortal />
    </>
  );
};

export default observer(PollListPage);
