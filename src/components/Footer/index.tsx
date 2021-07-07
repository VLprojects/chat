import React, { FC } from 'react';

import styles from './Footer.module.scss';

interface ChatFooterProps {
  children: JSX.Element
}

const ChatFooter: FC<ChatFooterProps> = ({ children }) => (
  <div className={styles.footer}>
    {children}
  </div>
);

export default ChatFooter;
