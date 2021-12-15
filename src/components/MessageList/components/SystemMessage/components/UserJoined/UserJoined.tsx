import { Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import Message from '../../../../../../keystone/chat/message';

interface IUserJoined {
  message: Message;
}

const UserJoined: FC<IUserJoined> = (props) => {
  const {
    message: { systemData },
  } = props;

  return (
    <>
      <Grid item zeroMinWidth>
        <Typography variant="body2" fontWeight={600} noWrap>
          {systemData?.whoJoined?.maybeCurrent?.displayName}
        </Typography>
      </Grid>
      <Typography variant="body2" noWrap>
        <FormattedMessage id="joined" />
      </Typography>
    </>
  );
};

export default observer(UserJoined);
