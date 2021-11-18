import { Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import SubHeader from '../../components/SubHeader';
import useKeystone from '../../keystone';
import ChannelName from '../../ui-kit/ChannelName';
import CreatePollForm from './components/CreatePollForm';
import useStyles from './styles';

const CreatePollPage: FC = () => {
  const root = useKeystone();
  const { ui, chat } = root;
  const classes = useStyles();

  const channelId = String(ui.params.id);

  const currentChannel = chat.channels.get(channelId);
  if (!currentChannel) {
    return null;
  }

  return (
    <div>
      <SubHeader onBack={() => ui.back()}>
        <ChannelName name={currentChannel?.name} />
      </SubHeader>
      <Grid container direction="column" alignItems="center" className={classes.root}>
        <Grid item component={Typography}>
          <FormattedMessage id="createPoll" />
        </Grid>
        <Grid item component={CreatePollForm} channel={currentChannel} />
      </Grid>
    </div>
  );
};

export default CreatePollPage;
