import { Typography } from '@mui/material';
import cls from 'classnames';
import React, { FC } from 'react';
import useStyles from './styles';

interface IProps {
  title?: string | React.ReactNode;
  active?: boolean;
  sx?: Record<string, string>;
}
const HeaderTitle: FC<IProps> = (props) => {
  const { title, active, children, sx } = props;
  const classes = useStyles();

  return (
    <Typography
      variant="h4"
      color="textPrimary"
      className={cls(classes.root, { [classes.active]: active })}
      noWrap
      sx={sx}
    >
      {title || children}
    </Typography>
  );
};

export default HeaderTitle;
