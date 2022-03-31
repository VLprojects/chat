import { Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import HeaderTitle from 'ui-kit/HeaderTitle';

import SubHeader from '../../components/SubHeader';
import useKeystone from '../../keystone';
import CreatePollForm from './components/CreatePollForm';

const CreatePollPage: FC = () => {
  const root = useKeystone();
  const { ui } = root;

  const currentChannel = root.currentChannel;

  if (!currentChannel) {
    return null;
  }

  return (
    <>
      <SubHeader onBack={() => ui.back()}>
        <HeaderTitle title={currentChannel?.name} />
      </SubHeader>
      <Grid container padding="24px 0px 24px 24px " overflow="auto" direction="column" wrap="nowrap">
        <Typography variant="h2" alignSelf="center">
          <FormattedMessage id="createPoll" />
        </Typography>

        <CreatePollForm channel={currentChannel} />
      </Grid>
    </>
  );
};

export default CreatePollPage;
