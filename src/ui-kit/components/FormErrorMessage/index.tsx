import React, { FC } from 'react';
import useStyles from './styles';

interface IFormErrorMessae {
  message: string;
}

const FormErrorMessage: FC<IFormErrorMessae> = ({ message }) => {
  const classes = useStyles();
  if (message === '') return null;

  return (
    <div className={classes.error}>
      <div>{message}</div>
    </div>
  );
};

export default FormErrorMessage;
