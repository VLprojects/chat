import useKeystone from 'keystone';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { MAX_CHANNEL_MESSAGES } from 'utils/consts';
import { checkDateWhen, checkDayInterval } from 'utils/date';
import { fetchMessagesBefore } from '../../keystone/service';
import MessageRow from './components/MessageRow';
import useStyles from './styles';

interface MessageListProps {
  channelId: string;
}

const MessageList: FC<MessageListProps> = (props) => {
  const { channelId } = props;
  const classes = useStyles();
  const virtuosoRef = useRef<VirtuosoHandle | null>(null);
  const { ui, chat } = useKeystone();
  const root = useKeystone();
  const [firstItemIndex, setFirstItemIndex] = useState(MAX_CHANNEL_MESSAGES);
  const [prevMessagesLength, setPrevMessagesLength] = useState(0);
  const [isFullyFetched, setIsFullyFetched] = useState(false);

  const channel = chat.channels.get(channelId);
  if (!channel) {
    return <>Channel not found</>;
  }

  const messages = channel.sortedMessages;

  // watching for messages length changes to prevent scroll when more messages are being loaded
  // https://virtuoso.dev/prepend-items/
  useEffect(() => {
    const diff = messages.length - prevMessagesLength;
    setPrevMessagesLength(messages.length);
    if (diff) {
      setFirstItemIndex(firstItemIndex - diff);
    }
  }, [messages.length]);

  useEffect(() => {
    ui.setJumpToMessage((index) => {
      virtuosoRef.current?.scrollToIndex({ index, behavior: 'smooth' });
    });
  }, []);

  const fetchMore = useCallback(async () => {
    if (!isFullyFetched) {
      const newMessages = await fetchMessagesBefore(root, Number(channelId), Number(messages[0]?.id));
      if (!newMessages) {
        setIsFullyFetched(true);
      }
    }
  }, [messages[0]?.id, isFullyFetched]);

  return (
    <div className={classes.virtListWrapper}>
      {/* do not use vertical margins in children, that will break calc of size height */}
      <Virtuoso
        style={{ overflow: 'hidden auto' }}
        ref={virtuosoRef}
        firstItemIndex={firstItemIndex}
        startReached={fetchMore}
        initialTopMostItemIndex={Math.max(messages.length - 1, 0)}
        totalCount={messages.length}
        data={messages}
        itemContent={(virtuosoIndex, message) => {
          const index = virtuosoIndex - firstItemIndex;
          let short = false;
          let prevMessage = null;
          if (index > 0) {
            prevMessage = messages[index - 1];
            short = message?.user?.current.id === prevMessage?.user?.current.id;
          }

          const last = index === messages.length - 1;

          const showLineTime = prevMessage && checkDayInterval(message.createdAt, prevMessage?.createdAt || '0') >= 1;
          const showLineTimeInTheBegining = index === 0 && !checkDateWhen(message.createdAt, 'today');

          return (
            <MessageRow
              key={message.id}
              message={message}
              index={index}
              short={short}
              last={last}
              showLineTime={showLineTime || showLineTimeInTheBegining}
            />
          );
        }}
        followOutput={(isAtBottom: boolean) => {
          if (isAtBottom) {
            return 'smooth';
          } else {
            return false;
          }
        }}
      />
    </div>
  );
};

export default observer(MessageList);
