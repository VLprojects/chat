import React, { FC } from 'react';

import styles from './Avatar.module.scss';

interface IAvatar {
  username?: string;
  url?: string;
}

const Avatar: FC<IAvatar> = (props) => {
  const { username, url } = props;

  const avatarLetter = username ? username[0] : '';

  return (
    <div className={styles.avatar}>
      {url && url.length > 0
        ? <img src={url} alt={username} />
        : avatarLetter}
    </div>
  );
};

export default Avatar;
