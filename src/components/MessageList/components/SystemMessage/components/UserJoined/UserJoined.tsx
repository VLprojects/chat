import { Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';

interface IUserJoined {
  name?: string;
}

const UserJoined: FC<IUserJoined> = (props) => {
  const { name } = props;

  return (
    <>
      <Grid item zeroMinWidth>
        <Typography variant="body2" fontWeight={600} noWrap>
          {name}
        </Typography>
      </Grid>
      <Typography variant="body2" noWrap>
        <FormattedMessage id="joined" />
      </Typography>
    </>
  );
};

export default UserJoined;
