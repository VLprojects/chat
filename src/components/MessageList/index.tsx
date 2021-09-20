import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import useKeystone from '../../keystone';
import Message from '../../keystone/chat/message';
import useStyles from './styles';
import UserMessage from './UserMessage';
import SystemMessage from './UserMessage/SystemMessage';

interface MessageListProps {
  messages: Message[];
}

const MessageList: FC<MessageListProps> = (props) => {
  const classes = useStyles();
  const { messages = [] } = props;
  const { auth } = useKeystone();
  const scrollbarRef = useRef<Scrollbars>(null);

  const scrollToBottom = () => {
    scrollbarRef.current?.scrollToBottom();
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={classes.messages}>
      <Scrollbars autoHide ref={scrollbarRef}>
        <div className={classes.messagesListWrapper}>
          {messages &&
            messages.map((msg, index: number) => {
              if (msg.type === 'system') {
                return <SystemMessage key={msg.id} message={msg.text} date={msg.createdAt} type="system" />;
              }

              if (msg.user) {
                return (
                  <UserMessage
                    short={msg.user.current.id === messages[index - 1]?.user?.current.id}
                    key={msg.id}
                    own={msg.user.current.id === `${auth.me.id}`}
                    user={msg.user.current}
                    message={msg.text}
                    date={msg.createdAt}
                  />
                );
              }

              return null;
            })}
        </div>
      </Scrollbars>
    </div>
  );
};

export default observer(MessageList);
