import AvatarMUI from '@material-ui/core/Avatar';
import React, { FC } from 'react';
import useStyles from './styles';
import { getLeadingLetters } from '../../../utils/helper';

export enum Size {
  lg = 32,
  sm = 24,
}

export interface IProps {
  src?: string;
  name?: string;
  size: keyof typeof Size;
  onClick?: () => void;
}

const Avatar: FC<IProps> = (props) => {
  const { src, onClick, name } = props;
  const classes = useStyles(props);

  return (
    <AvatarMUI alt={name} src={src} className={classes.avatar} onClick={onClick}>
      {name && getLeadingLetters(name.trim())}
    </AvatarMUI>
  );
};

export default Avatar;
