import { Typography } from '@material-ui/core';
import React, { FC } from 'react';

interface IProps {
  name: string;
}
const ChannelName: FC<IProps> = ({ name }) => <Typography variant="h4">{name || ''}</Typography>;

export default ChannelName;
