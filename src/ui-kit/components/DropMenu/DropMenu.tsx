import { Menu as MenuMUI } from '@mui/material';
import React from 'react';
import useStyles from './styles';

interface IProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export const DropMenu: React.FC<IProps> = (props) => {
  const { open, onClose, anchorEl, children } = props;
  const classes = useStyles();

  return (
    <MenuMUI disableAutoFocusItem open={open} classes={{ paper: classes.paper }} anchorEl={anchorEl} onClose={onClose}>
      {children}
    </MenuMUI>
  );
};

export default DropMenu;
