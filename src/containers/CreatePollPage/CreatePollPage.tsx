import { Grid, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import HeaderTitle from 'ui-kit/HeaderTitle';
import SubHeader from '../../components/SubHeader';
import useKeystone from '../../keystone';
import CreatePollForm from './components/CreatePollForm';
import SelectPollType from './components/SelectPollType/SelectPollType';
import useStyles from './styles';
import { PollTypeEnum } from './types';

const CreatePollPage: FC = () => {
  const root = useKeystone();
  const { ui, chat } = root;
  const classes = useStyles();
  const channelId = String(ui.params.id);
  const currentChannel = chat.channels.get(channelId);
  const [currentSelectedType, setCurrentSelectedType] = useState(PollTypeEnum.OneAnswer);

  if (!currentChannel) {
    return null;
  }

  return (
    <>
      <SubHeader onBack={() => ui.back()}>
        <HeaderTitle title={currentChannel?.name} />
      </SubHeader>
      <Grid container className={classes.gridContainer}>
        <Grid item component={Typography} variant="h3" xs className={classes.headerText}>
          <FormattedMessage id="createPoll" />
        </Grid>
        <SelectPollType onSelectedType={setCurrentSelectedType} />
        <CreatePollForm channel={currentChannel} selectedPollType={currentSelectedType} />
      </Grid>
    </>
  );
};

export default CreatePollPage;
