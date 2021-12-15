import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import Message from '../../../../../../keystone/chat/message';

interface IChangedChannel {
  message: Message;
}

const ChangedChannel: FC<IChangedChannel> = (props) => {
  const {
    message: { systemData },
  } = props;

  return (
    <>
      <Typography variant="body2" noWrap>
        <FormattedMessage id="systemMessageChangedChannelName" />
      </Typography>
      <Typography variant="body2" fontWeight={600} noWrap>
        {systemData?.newName}
      </Typography>
    </>
  );
};

export default ChangedChannel;
