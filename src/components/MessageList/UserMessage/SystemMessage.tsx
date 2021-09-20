import { Typography } from '@material-ui/core';
import cls from 'classnames';
import React, { FC } from 'react';
import useStyles from './styles';

interface ISystemMessageProps {
  message: string;
  date?: string;
  isNew?: boolean;
  type?: 'system';
}

const SystemMessage: FC<ISystemMessageProps> = (props) => {
  const { message = '', isNew, type } = props;
  const classes = useStyles();
  return (
    <div className={cls(classes.message, { [classes.isNew]: isNew, [classes.system]: type })}>
      <Typography> {message}</Typography>
    </div>
  );
};

export default SystemMessage;
