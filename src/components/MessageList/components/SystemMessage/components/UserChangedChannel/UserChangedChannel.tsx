import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';

interface IUserChangedChannel {
  userName?: string;
  channelName?: string;
}

const UserChangedChannel: FC<IUserChangedChannel> = (props) => {
  const { userName, channelName } = props;

  return (
    <>
      <Typography variant="body2" fontWeight={600} noWrap>
        {userName}
      </Typography>
      <Typography variant="body2" noWrap>
        <FormattedMessage id="systemMessageUserChangedChannelName" />
      </Typography>
      <Typography variant="body2" fontWeight={600} noWrap>
        {channelName}
      </Typography>
    </>
  );
};

export default UserChangedChannel;
