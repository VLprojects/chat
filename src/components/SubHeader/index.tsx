import { Box, IconButton } from '@material-ui/core';
import React, { FC } from 'react';
import ChevronLeftIcon from 'ui-kit/icons/ChevronLeftIcon';
import { COLOURS } from '../../theme/consts';
import useStyles from './styles';

interface ISubHeader {
  onBack?: () => void;
  rightButton?: JSX.Element;
}

const SubHeader: FC<ISubHeader> = (props) => {
  const { children, onBack, rightButton = <></> } = props;
  const classes = useStyles();

  return (
    <div className={classes.subHeader}>
      {onBack && (
        <IconButton onClick={onBack}>
          <Box m={2}>
            <ChevronLeftIcon fill={COLOURS.TEXT_PRIMARY} />
          </Box>
        </IconButton>
      )}
      <div className={classes.title}>{children}</div>
      {rightButton}
    </div>
  );
};

export default SubHeader;
