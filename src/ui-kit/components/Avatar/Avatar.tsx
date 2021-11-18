import { Avatar as AvatarMUI, Typography } from '@mui/material';
import React, { FC } from 'react';
import { AvatarColorEnum, COLOURS } from 'theme/consts';
import { getLeadingLetters } from '../../../utils/helper';
import useStyles from './styles';

export enum Size {
  lg = 32,
  sm = 24,
}

export interface IProps {
  src?: string;
  name?: string;
  size: keyof typeof Size;
  onClick?: () => void;
  avatarColor?: AvatarColorEnum;
}

const Avatar: FC<IProps> = (props) => {
  const { src, onClick, name, avatarColor = AvatarColorEnum.AVATAR1_BURGUNDY } = props;
  const classes = useStyles(props);

  return (
    <AvatarMUI
      alt={name}
      src={src}
      className={classes.avatar}
      onClick={onClick}
      sx={{ bgcolor: src ? 'inherit' : COLOURS[avatarColor] }}
    >
      <Typography variant="h4">{name && getLeadingLetters(name.trim())}</Typography>
    </AvatarMUI>
  );
};

export default Avatar;
