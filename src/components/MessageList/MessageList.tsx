import useKeystone from 'keystone';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useLayoutEffect, useRef } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import Message from '../../keystone/chat/message';
import MessageRow from './components/MessageRow';
import useStyles from './styles';

interface MessageListProps {
  messages: Message[];
}

const MessageList: FC<MessageListProps> = (props) => {
  const { messages = [] } = props;
  const classes = useStyles();
  const virtuosoRef = useRef<VirtuosoHandle | null>(null);
  const { ui } = useKeystone();

  const jumpToMessage = () => {
    virtuosoRef.current?.scrollToIndex({ index: ui.pinnedMessageIdx.msgIdx, behavior: 'smooth' });
  };

  useEffect(() => {
    if (ui.pinnedMessageIdx.msgIdx || ui.pinnedMessageIdx.msgIdx === 0) {
      jumpToMessage();
    }
  }, [ui.pinnedMessageIdx]);

  const scrollToLastOnLoad = () =>
    virtuosoRef?.current?.scrollIntoView({ index: messages.length - 1, behavior: 'smooth' });

  useLayoutEffect(() => {
    const timer = setTimeout(() => scrollToLastOnLoad(), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={classes.virtListWrapper}>
      {/* do not use vertical margins in children, that will break calc of size height */}
      <Virtuoso
        ref={virtuosoRef}
        totalCount={messages.length}
        itemContent={(idx) => <MessageRow key={messages[idx].id} data={messages} index={idx} />}
        followOutput={() => 'smooth'}

        /* Do not use - break size height calculation */
        // initialTopMostItemIndex={messages.length - 1}
      />
    </div>
  );
};

export default observer(MessageList);
