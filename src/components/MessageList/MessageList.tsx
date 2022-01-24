import useKeystone from 'keystone';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useRef } from 'react';
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

  return (
    <div className={classes.virtListWrapper}>
      {/* do not use vertical margins in children, that will break calc of size height */}
      <Virtuoso
        ref={virtuosoRef}
        totalCount={messages.length}
        itemContent={(idx) => <MessageRow key={messages[idx].id} data={messages} index={idx} />}
        followOutput={() => 'smooth'}
        initialTopMostItemIndex={messages.length ? messages.length - 1 : 0}
      />
    </div>
  );
};

export default observer(MessageList);
