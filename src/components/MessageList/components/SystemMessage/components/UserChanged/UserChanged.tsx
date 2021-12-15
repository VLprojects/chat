import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import Message from '../../../../../../keystone/chat/message';

interface IUserChanged {
  message: Message;
}

const UserChanged: FC<IUserChanged> = (props) => {
  const {
    message: { systemData },
  } = props;

  return (
    <>
      <Typography variant="body2" fontWeight={600} noWrap>
        {systemData?.oldDisplayName}
      </Typography>
      <Typography variant="body2" noWrap>
        <FormattedMessage id="systemMessageChangedName" />
      </Typography>
      <Typography variant="body2" fontWeight={600} noWrap>
        {systemData?.newDisplayName}
      </Typography>
    </>
  );
};

export default UserChanged;
