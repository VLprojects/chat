import { CloseRounded } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import React, { FC } from 'react';
import { COLOURS } from '../../../../theme/consts';

const useStyles = makeStyles({
  deleteButton: { color: 'white', backgroundColor: COLOURS.BLACK_01, borderRadius: 4, fill: 'white', width: 20 },
});

const CloseButton: FC = () => {
  const classes = useStyles();

  return <CloseRounded className={classes.deleteButton} />;
};

export default CloseButton;
