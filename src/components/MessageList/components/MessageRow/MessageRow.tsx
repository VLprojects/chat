import { Box } from '@mui/system';
import Message from 'keystone/chat/message';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { MessageTypeEnum } from 'types/enums';
import SystemMessage from '../SystemMessage';
import UserMessage from '../UserMessage';

interface IProps {
  message: Message;
  short: boolean;
  last: boolean;
  showLineTime: boolean;
  index: number;
}

const MessageRow: React.FC<IProps> = (props) => {
  const { message, short, last, index, showLineTime } = props;
  const style = { paddingLeft: '24px', paddingRight: '8px', paddingBottom: last ? '5px' : '0' };

  const user = message.user?.current;
  switch (message.type) {
    case MessageTypeEnum.User:
      return (
        <Box sx={style}>
          <UserMessage short={short} user={user} message={message} index={index} showLineTime={showLineTime} />
        </Box>
      );
    case MessageTypeEnum.System:
      return (
        <div style={{ paddingTop: index ? '30px' : 0 }}>
          <SystemMessage message={message} />
        </div>
      );
    default:
      return null;
  }
};
export default observer(MessageRow);
