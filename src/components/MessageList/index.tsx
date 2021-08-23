import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import useKeystone from '../../keystone';
import Message from '../../keystone/chat/message';
import UserMessage from './UserMessage';
import SystemMessage from './UserMessage/SystemMessage';
import useStyles from './styles';

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
      <Scrollbars autoHide ref={scrollbarRef} className={classes.scrollbars}>
        <div className={classes.messagesListWrapper}>
          {messages &&
            messages.map((item, index: number) => {
              if (item.type === 'system') {
                return <SystemMessage key={item.id} message={item.text} date={item.createdAt} type="system" />;
              }

              if (item.user) {
                return (
                  <UserMessage
                    short={item.user.current.id === messages[index - 1].user?.current.id}
                    key={item.id}
                    own={item.user.current.id === auth.me.id}
                    user={item.user.current}
                    message={item.text}
                    date={item.createdAt}
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
