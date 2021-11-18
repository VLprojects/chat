import { ChevronLeft } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import cls from 'classnames';
import React, { FC, memo } from 'react';
import { COLOURS } from 'theme/consts';
import useStyles from './styles';

interface IDrawerProps {
  children?: React.ReactNode;
  open?: boolean;

  onClickClose?: () => void;
}

const Drawer: FC<IDrawerProps> = (props) => {
  const { children, onClickClose, open } = props;
  const classes = useStyles();

  return (
    <>
      {open && (
        <>
          <div className={cls({ [classes.background]: open })} />
          <div
            className={cls({
              [classes.root]: true,
            })}
          >
            <IconButton className={classes.cancelButton} onClick={onClickClose}>
              <ChevronLeft fill={COLOURS.BLACK_01} />
            </IconButton>

            <div className={classes.content}>{children}</div>
          </div>
        </>
      )}
    </>
  );
};

export default memo(Drawer);
