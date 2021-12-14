import { Grid } from '@mui/material';
import useKeystone from 'keystone';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import Message from '../../../../keystone/chat/message';
import User from '../../../../keystone/chat/user';
import ChangedChannel from './components/ChangedChannel';
import UserChanged from './components/UserChanged';
import UserChangedChannel from './components/UserChangedChannel';
import UserJoined from './components/UserJoined';

enum SystemMessageEnum {
  UserJoinedEvent = 'user-joined',
  UserChangedEvent = 'user-changed',
  UserChangedChannelEvent = 'user-changed-channel',
  ChangedChannelEvent = 'changed-channel',
}

interface ISystemMessageProps {
  message: Message;
}

interface ISystemMessageMeta {
  meta: {
    event: SystemMessageEnum;
    data: {
      userId?: number;
      oldName?: string;
      newName?: string;
      oldDisplayName?: string;
      newDisplayName?: string;
    };
  };
}

const SystemMessage: FC<ISystemMessageProps> = (props) => {
  const { message } = props;
  const {
    meta: { event, data },
  } = message as unknown as ISystemMessageMeta;
  const { chat } = useKeystone();
  const [userObserver, setUserObserver] = useState<User | undefined>();

  useEffect(() => {
    setUserObserver(chat.getUserLazy(String(data.userId)));
  }, [message]);

  const renderMessage = () => {
    switch (event) {
      case SystemMessageEnum.UserJoinedEvent:
        return <UserJoined name={userObserver?.displayName} />;
      case SystemMessageEnum.UserChangedEvent:
        return <UserChanged oldName={data?.oldDisplayName} name={data?.newDisplayName} />;
      case SystemMessageEnum.UserChangedChannelEvent:
        return <UserChangedChannel userName={userObserver?.displayName} channelName={data?.newName} />;
      case SystemMessageEnum.ChangedChannelEvent:
        return <ChangedChannel name={data?.newName} />;
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
