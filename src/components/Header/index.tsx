import React, { FC } from 'react';
import Routes from 'routes';
import useStores from 'stores/rootStore';
import { Image } from 'ui-kit';
import ChatMinimize from 'ui-kit/assets/icons/chat-minimize.svg';
import ChatUsers from 'ui-kit/assets/icons/chat-users.svg';
import styles from './Header.module.scss';

interface IChatHeader {
  title: string;
  showProfile?: boolean;
}

const ChatHeader: FC<IChatHeader> = (props) => {
  const { title, showProfile = true } = props;
  const { chatStore } = useStores();

  return (
    <div className={styles.header}>
      <div className={styles.icon} onClick={() => chatStore.setRoute(Routes.Channels)}>
        <Image src={ChatMinimize} alt="" />
      </div>
      <div className={styles.title}>{title}</div>
      {chatStore.route === '/profile' ? (
        <button type="button" onClick={() => chatStore.setRoute('')} className={styles.buttonClose}>
          ✕
        </button>
      ) : (
        <div className={styles.profileIcon} onClick={() => chatStore.setRoute(Routes.Profile)}>
          <Image src={ChatUsers} alt="" />
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
