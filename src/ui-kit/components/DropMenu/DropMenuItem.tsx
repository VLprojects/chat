import { MenuItem, MenuItemProps } from '@mui/material';
import cls from 'classnames';
import React from 'react';
import useStyles from './styles';

interface IProps {
  onClose?: () => void;
  href?: string;
  action?: (e: React.SyntheticEvent) => void;
  className?: string;
}

export const DropMenuItem: React.FC<IProps & MenuItemProps> = (props) => {
  const { disabled, selected, children, divider, href, action, onClose, className } = props;
  const classes = useStyles();

  const onClick = (e: React.SyntheticEvent) => {
    if (href) {
      window.open(href, '_target');
      return;
    }
    if (action) {
      e.preventDefault();
      e.stopPropagation();
      action(e);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <MenuItem
      onClick={onClick}
      disableRipple
      divider={divider}
      disabled={disabled}
      selected={selected}
      classes={{ root: cls(classes.menuItem, className) }}
    >
      {children}
    </MenuItem>
  );
};

export default DropMenuItem;
