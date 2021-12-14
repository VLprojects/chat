import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';

interface IUserChanged {
  oldName?: string;
  name?: string;
}

const UserChanged: FC<IUserChanged> = (props) => {
  const { oldName, name } = props;

  return (
    <>
      <Typography variant="body2" fontWeight={600} noWrap>
        {oldName}
      </Typography>
      <Typography variant="body2" noWrap>
        <FormattedMessage id="systemMessageChangedName" />
      </Typography>
      <Typography variant="body2" fontWeight={600} noWrap>
        {name}
      </Typography>
    </>
  );
};

export default UserChanged;
