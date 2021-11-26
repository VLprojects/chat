import { Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import HeaderTitle from 'ui-kit/HeaderTitle';
import SubHeader from '../../components/SubHeader';
import useKeystone from '../../keystone';
import CreatePollForm from './components/CreatePollForm';

const CreatePollPage: FC = () => {
  const root = useKeystone();
  const { ui, chat } = root;

  const channelId = String(ui.params.id);

  const currentChannel = chat.channels.get(channelId);
  if (!currentChannel) {
    return null;
  }

  return (
    <>
      <SubHeader onBack={() => ui.back()}>
        <HeaderTitle title={currentChannel?.name} />
      </SubHeader>
      <Grid item component={Typography} sx={{ padding: '32px 24px 0px' }}>
        <FormattedMessage id="createPoll" />
      </Grid>
      <Grid item component={CreatePollForm} channel={currentChannel} />
    </>
  );
};

export default CreatePollPage;
