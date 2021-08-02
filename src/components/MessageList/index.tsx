import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import useStores from 'stores/rootStore';
import { IChannelMessage } from '../../stores/chatStore/types';
import Message from './Message';
import SystemMessage from './Message/SystemMessage';
import styles from './Messages.module.scss';

interface MessageListProps {
  messages?: IChannelMessage[];
}

const onpage = 15;

const MessageList: FC<MessageListProps> = (props) => {
  const { messages = [] } = props;
  const { profileStore, chatStore } = useStores();
  const scrollbarRef = useRef<Scrollbars>(null);
  const [page, setPage] = useState(1);

  const scrollToBottom = () => {
    scrollbarRef.current?.scrollToBottom();
  };

  

  useEffect(() => {
    console.log('effect', messages);
  }, []);

  // useEffect(() => {
  //   scrollToBottom();
  // }, []);

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const onScrollStart = () => {
    // const maxPages: number = messages ? messages.length % onpage : 0;
    // if (scrollbarRef.current.getScrollTop() <= 100 && page <= maxPages) {
    //   setPage((p) => p + 1);
    // }
  };

  const pageStart = messages && messages.length - page * onpage;

  return (
    <div className={styles.messages}>
      <Scrollbars autoHide ref={scrollbarRef} className={styles.scrollbars} onScroll={onScrollStart}>
        {/* {messages && messages.slice(pageStart < 0 ? 0 : pageStart, messages.length).map((item: any) => { */}
        {messages &&
          messages.map((item: any) => {
            if (item.type === 'system') {
              return (
                <SystemMessage
                  key={item.id}
                  message={item.text}
                  date={item.createdAt}
                  isNew={item.isNew}
                  type="system"
                />
              );
            }

            return (
              <Message
                key={item.id}
                own={item.userId === profileStore.user?.id}
                userId={item.userId}
                message={item.text}
                date={item.createdAt}
                isNew={item.isNew}
              />
            );
          })}
      </Scrollbars>
    </div>
  );
};

export default observer(MessageList);
