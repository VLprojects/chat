import React, { FC } from 'react';
import { SxProps } from '@mui/system';
import useStyles from './styles';

interface IProps {
  message?: string;
}

const ErrorMessage: FC<IProps & SxProps> = (props) => {
  const { message } = props;
  const classes = useStyles();

  return <div className={classes.root}>{message}</div>;
};

export default ErrorMessage;
