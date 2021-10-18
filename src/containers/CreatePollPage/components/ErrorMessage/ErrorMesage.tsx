import React, { FC } from 'react';
import useStyles from './styles';

interface IProps {
  message?: string;
}

const ErrorMessage: FC<IProps> = (props) => {
  const { message } = props;
  const classes = useStyles();

  return <div className={classes.root}>{message}</div>;
};

export default ErrorMessage;
