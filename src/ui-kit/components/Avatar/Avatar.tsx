import AvatarMUI from '@material-ui/core/Avatar';
import React, { FC } from 'react';
import useStyles from './styles';

export enum Size {
  lg = 32,
  sm = 24,
}

export interface IProps {
  src?: string;
  size: keyof typeof Size;
  onClick?: () => void;
}

const Avatar: FC<IProps> = (props) => {
  const { src, onClick } = props;
  const classes = useStyles(props);

  return <AvatarMUI alt="avatar" src={src} className={classes.avatar} onClick={onClick} />;
};

export default Avatar;
