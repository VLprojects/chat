import React, { FC, memo } from 'react';
import { Button } from '@material-ui/core';
import cls from 'classnames';
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
            <div className={classes.cancelButton}>
              <Button onClick={onClickClose}>Cancel</Button>
            </div>

            <div className={classes.content}>{children}</div>
          </div>
        </>
      )}
    </>
  );
};

export default memo(Drawer);
