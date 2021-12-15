import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import Message, { SystemMessageEnum } from '../../../../keystone/chat/message';
import ChangedChannel from './components/ChangedChannel';
import UserChanged from './components/UserChanged';
import UserChangedChannel from './components/UserChangedChannel';
import UserJoined from './components/UserJoined';

interface ISystemMessageProps {
  message: Message;
}

const SystemMessage: FC<ISystemMessageProps> = (props) => {
  const { message } = props;
  const {
    meta: { event },
  } = message;

  const renderMessage = () => {
    switch (event) {
      case SystemMessageEnum.UserJoinedEvent:
        return <UserJoined message={message} />;
      case SystemMessageEnum.UserChangedEvent:
        return <UserChanged message={message} />;
      case SystemMessageEnum.UserChangedChannelEvent:
        return <UserChangedChannel message={message} />;
      case SystemMessageEnum.ChangedChannelEvent:
        return <ChangedChannel message={message} />;
      default:
        return null;
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" wrap="nowrap" columnGap={1}>
      {renderMessage()}
    </Grid>
  );
};

export default observer(SystemMessage);
