import { IconButton } from '@mui/material';
import React, { FC } from 'react';
import ChevronLeftIcon from 'ui-kit/icons/ChevronLeftIcon';
import { COLOURS } from '../../theme/consts';
import useStyles from './styles';

interface ISubHeader {
  onBack?: () => void;
  rightButton?: JSX.Element;
}

const SubHeader: FC<ISubHeader> = (props) => {
  const { children, onBack, rightButton } = props;
  const classes = useStyles();

  return (
    <div className={classes.header}>
      {onBack && (
        <IconButton onClick={onBack} size="small" sx={{ position: 'absolute', left: 30 }}>
          <ChevronLeftIcon fill={COLOURS.BLACK_01} />
        </IconButton>
      )}
      {children}
      {rightButton}
    </div>
  );
};

export default SubHeader;
