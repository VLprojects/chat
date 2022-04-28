import { IconButton } from '@mui/material';
import React, { FC } from 'react';
import ChevronLeftIcon from 'ui-kit/icons/ChevronLeftIcon';
import CloseClean from 'ui-kit/icons/CloseClean';
import { COLOURS } from '../../theme/consts';
import useStyles from './styles';
import eventBus from 'utils/eventBus';
import { EventBusEventEnum, ListenerEventEnum } from 'utils/eventBus/types';

interface ISubHeader {
  onBack?: () => void;
}

const SubHeader: FC<ISubHeader> = (props) => {
  const { children, onBack } = props;
  const classes = useStyles();

  const onClose = () => {
    eventBus.emit(ListenerEventEnum.App, {
      event: EventBusEventEnum.ChatClose,
    });
  }

  return (
    <div className={classes.header}>
      {onBack && (
        <IconButton onClick={onBack} size="small" sx={{ position: 'absolute', left: 30 }}>
          <ChevronLeftIcon fill={COLOURS.BLACK_01} />
        </IconButton>
      )}
      {children}
      <IconButton sx={{ position: 'absolute', right: '15px' }} onClick={onClose}>
        <CloseClean />
      </IconButton>
    </div>
  );
};

export default SubHeader;
