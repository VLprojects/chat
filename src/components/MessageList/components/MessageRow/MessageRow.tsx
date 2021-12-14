import Message from 'keystone/chat/message';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { MessageTypeEnum } from 'types/enums';
import SystemMessage from '../SystemMessage';
import UserMessage from '../UserMessage';

interface IProps {
  data: Message[];
  index: number;
}
const MessageRow: React.FC<IProps> = (props) => {
  const { data, index } = props;
  const message = data[index];
  const prevMessage = data[index - 1] || {};
  const short =
    message?.user?.current.id === prevMessage?.user?.current.id && prevMessage.type !== MessageTypeEnum.System;

  switch (message.type) {
    case MessageTypeEnum.User:
      return (
        <div
          style={{ paddingLeft: '24px', paddingRight: '8px', paddingBottom: data.length - 1 === index ? '5px' : '0' }}
        >
          <UserMessage short={short} message={message} index={index} />
        </div>
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
