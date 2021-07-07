import React, { FC } from 'react';

import styles from './FormErrorMessage.module.scss';

interface IFormErrorMessae {
  message: string;
}

const FormErrorMessage: FC<IFormErrorMessae> = ({ message }) => {
  if (message === '') return null;

  return (
    <div className={styles.error}>
      <div>{message}</div>
    </div>
  );
};

export default FormErrorMessage;
