import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';

interface IChangedChannel {
  name?: string;
}

const ChangedChannel: FC<IChangedChannel> = (props) => {
  const { name } = props;

  return (
    <>
      <Typography variant="body2" noWrap>
        <FormattedMessage id="systemMessageChangedChannelName" />
      </Typography>
      <Typography variant="body2" fontWeight={600} noWrap>
        {name}
      </Typography>
    </>
  );
};

export default ChangedChannel;
