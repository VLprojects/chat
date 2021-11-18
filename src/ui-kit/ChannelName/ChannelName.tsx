import { Typography } from '@mui/material';
import React, { FC } from 'react';
import useStyles from './styles';

interface IProps {
  name: string;
}
const ChannelName: FC<IProps> = ({ name }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography color="textPrimary">{name || ''}</Typography>
    </div>
  );
};

export default ChannelName;
