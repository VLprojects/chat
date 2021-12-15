import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import Message from '../../../../../../keystone/chat/message';

interface IUserChangedChannel {
  message: Message;
}

const UserChangedChannel: FC<IUserChangedChannel> = (props) => {
  const {
    message: { systemData },
  } = props;

  return (
    <>
      <Typography variant="body2" fontWeight={600} noWrap>
        {systemData?.whoRenamedChannel?.maybeCurrent?.displayName}
      </Typography>
      <Typography variant="body2" noWrap>
        <FormattedMessage id="systemMessageUserChangedChannelName" />
      </Typography>
      <Typography variant="body2" fontWeight={600} noWrap>
        {systemData?.newName}
      </Typography>
    </>
  );
};

export default UserChangedChannel;
