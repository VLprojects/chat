import React, { FC, HTMLAttributes } from 'react';
import useStyles from './styles';

interface IProps {
  message?: string;
}

const ErrorMessage: FC<IProps & HTMLAttributes<HTMLDivElement>> = (props) => {
  const { message, ...rest } = props;
  const classes = useStyles();

  return (
    <div {...rest} className={classes.root}>
      {message}
    </div>
  );
};

export default ErrorMessage;
