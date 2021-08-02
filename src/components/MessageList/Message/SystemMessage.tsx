import React, { FC } from 'react';
import styles from './Message.module.scss';

interface ISystemMessageProps {
  message: string;
  date?: string;
  isNew?: boolean;
  type?: 'system';
}

const SystemMessage: FC<ISystemMessageProps> = ({ message = '', isNew = false, type = '' }) => (
  <div className={[styles.message, isNew ? styles.isNew : '', styles[type]].join(' ')}>{message}</div>
);

export default SystemMessage;
