import React, { FC } from 'react';
import useStyles from './styles';

const Checkbox: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.checkbox}>
      <label>
        <input className={classes.input} type="checkbox" name="checkbox" value="" />
        <div className={classes.checkbox} />
      </label>
    </div>
  );
};

export default Checkbox;
