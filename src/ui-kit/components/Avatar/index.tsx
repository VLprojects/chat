import cls from 'classnames';
import React, { FC } from 'react';
import { Image } from 'ui-kit';
import UserIcon from 'ui-kit/assets/icons/user.svg';
import styles from './Avatar.module.scss';

interface IProps {
  counter?: number;
  url?: string;
  size?: 'large';
}

const Avatar: FC<IProps> = (props) => {
  const { url, counter, size = '' } = props;
  const classes = cls(styles.avatar, { [styles[size]]: size });

  if (counter) return <div className={classes}>{counter}</div>;

  return (
    <div className={classes}>
      <Image src={url || UserIcon} alt="avatar" />
    </div>
  );
};

export default Avatar;
