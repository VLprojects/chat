import cls from 'classnames';
import React, { FC } from 'react';
import useStyles from './styles';

const WineLoader: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.wineLoader}>
      <ul>
        <li />
        <li />
        <li />
      </ul>
      <div className={cls(classes.wineglass, classes.left)}>
        <div className={classes.top} />
      </div>
      <div className={cls(classes.wineglass, classes.right)}>
        <div className={classes.top} />
      </div>
    </div>
  );
};

export default WineLoader;
