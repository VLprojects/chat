import { Grid, Typography } from '@mui/material';
import Box from '@mui/system/Box';
import React, { FC, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import HeaderTitle from 'ui-kit/HeaderTitle';
import SubHeader from '../../components/SubHeader';
import useKeystone from '../../keystone';
import Routes from '../../routes';
import { Button } from '../../ui-kit';
import PollPortal from '../PollPortal';
import TemplateList from './components/TemplateList';
import { getPollListForChannel } from './services';

const PollListPage: FC = () => {
  const root = useKeystone();
  const { ui } = root;

  const currentChannel = root.currentChannel;

  useEffect(() => {
    async function getList() {
      const response = await getPollListForChannel(currentChannel?.id);
      if (response) {
        currentChannel?.setPollList(response);
      }
    }

    getList();
  }, []);

  const onCreatePoll = () => {
    ui.setRoute(`${Routes.CreatePoll}/${currentChannel?.id}/${undefined}`);
  };

  return (
    <>
      <SubHeader onBack={() => ui.back()}>
        <HeaderTitle title={currentChannel?.name} />
      </SubHeader>

      <Grid container direction="column" wrap="nowrap" overflow="auto" padding="20px 24px" rowGap="23px">
        <TemplateList />
      </Grid>
      <Box padding="12px">
        <Button variant="contained" fullWidth size="large" data-qa="newPoll" onClick={onCreatePoll}>
          <Typography variant="body1">
            <FormattedMessage id="newPoll" />
          </Typography>
        </Button>
      </Box>
      <PollPortal />
    </>
  );
};

export default PollListPage;
