import React, {
  FC,
  useState,
  useEffect,
  useRef,
} from 'react';
import { observer } from 'mobx-react-lite';
import { Scrollbars } from 'react-custom-scrollbars';

import { TMessage } from 'types/messages';
import { TUser } from 'types/users';
import useStores from 'stores/root';

import Message from './Message';
import SystemMessage from './Message/SystemMessage';
import styles from './Messages.module.scss';

interface MessageListProps {
  messages?: TMessage[];
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
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onScrollStart = () => {
    // const maxPages: number = messages ? messages.length % onpage : 0;
    // if (scrollbarRef.current.getScrollTop() <= 100 && page <= maxPages) {
    //   setPage((p) => p + 1);
    // }
  };

  const pageStart = messages && messages.length - (page * onpage);

  return (
    <div className={styles.messages}>
      <Scrollbars autoHide ref={scrollbarRef} className={styles.scrollbars} onScroll={onScrollStart}>
        {/* {messages && messages.slice(pageStart < 0 ? 0 : pageStart, messages.length).map((item: any) => { */}
        {messages && messages.map((item: any) => {
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

          const user = chatStore.users.find((userItem: TUser) => userItem.id === item.userId);

          return (
            <Message
              key={item.id}
              own={item.userId === profileStore.user?.id}
              user={user}
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
