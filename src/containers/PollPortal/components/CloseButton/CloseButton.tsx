import { makeStyles } from '@material-ui/core';
import CloseRounded from '@material-ui/icons/CloseRounded';
import React, { FC } from 'react';
import { COLOURS } from '../../../../theme/consts';

const useStyles = makeStyles({
  deleteButton: { color: 'white', backgroundColor: COLOURS.TEXT_PRIMARY, borderRadius: 4, fill: 'white', width: 20 },
});

const CloseButton: FC = () => {
  const classes = useStyles();

  return <CloseRounded className={classes.deleteButton} />;
};

export default CloseButton;
