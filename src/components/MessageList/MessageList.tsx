import useKeystone from 'keystone';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import MessageRow from './components/MessageRow';
import useStyles from './styles';
import { fetchMessagesBefore } from '../../keystone/service';
import { checkDateWhen } from 'utils/date';
import { MAX_CHANNEL_MESSAGES } from 'utils/consts';

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
        ref={virtuosoRef}
        firstItemIndex={firstItemIndex}
        startReached={fetchMore}
        initialTopMostItemIndex={Math.max(messages.length - 1, 0)}
        totalCount={messages.length}
        data={messages}
        itemContent={(virtuosoIndex, message) => {
          const index = virtuosoIndex - firstItemIndex;
          let short = false;
          if (index > 0) {
            const prevMessage = messages[index - 1];
            short = message?.user?.current.id === prevMessage?.user?.current.id;
          }

          const last = index === messages.length - 1;
          const nextMessage = messages[index + 1] || {};
          const showLineTime =
            (last && !checkDateWhen(message.createdAt, 'today')) ||
            (checkDateWhen(nextMessage.createdAt, 'today') && !checkDateWhen(message.createdAt, 'today'));

          return (
            <MessageRow
              key={message.id}
              message={message}
              index={index}
              short={short}
              last={last}
              showLineTime={showLineTime}
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
