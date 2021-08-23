import cls from 'classnames';
import React, { FC } from 'react';
import { Image } from 'ui-kit';
import UserIcon from 'ui-kit/assets/icons/user.svg';
import useStyles from './styles';

interface IProps {
  counter?: number;
  url?: string;
  size?: 'large';
}

const Avatar: FC<IProps> = (props) => {
  const { url, counter, size } = props;
  const classes = useStyles();
  const classList = cls(classes.avatar, { [classes.large]: size });

  if (counter) return <div className={classList}>{counter}</div>;

  return (
    <div className={classList}>
      <Image src={url || UserIcon} alt="avatar" />
    </div>
  );
};

export default Avatar;
