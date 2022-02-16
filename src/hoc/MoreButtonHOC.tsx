import { MoreHoriz } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { FC } from 'react';
import { DropMenu } from 'ui-kit/components/DropMenu';

type IMoreButtonHOCProps<T> = T & {
  icon?: React.ReactNode;
};

type IInjected = {
  onClose?: () => void;
};

function MoreButton<T>(DropMenuItems: FC<T & IInjected>): FC<IMoreButtonHOCProps<T>> {
  const MoreButtonComponent: FC<IMoreButtonHOCProps<T>> = (props) => {
    const { icon, ...rest } = props;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const closeMenu = () => {
      setAnchorEl(null);
    };

    const openMenu = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setAnchorEl(e.currentTarget);
    };

    return (
      <>
        <IconButton
          onClick={openMenu}
          size="small"
          disableRipple
          disableFocusRipple
          edge="end"
          sx={{ zIndex: 1, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.07)' }}
        >
          {icon || <MoreHoriz style={{ fill: '#7D7D80' }} />}
        </IconButton>

        <DropMenu onClose={closeMenu} anchorEl={anchorEl} open={open}>
          <DropMenuItems {...(rest as T)} onClose={closeMenu} />
        </DropMenu>
      </>
    );
  };

  return MoreButtonComponent;
}

export default MoreButton;
