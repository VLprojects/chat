import { observer } from 'mobx-react-lite';
import React, { createRef, FC, RefObject, useEffect } from 'react';
import Scrollbars, { positionValues } from 'react-custom-scrollbars-2';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowProps } from 'react-virtualized';
import { CHAT_MESSAGE_SUBMIT_FOOTER_HEIGHT } from 'theme/consts';
import { MessageTypeEnum } from 'types/enums';
import useKeystone from '../../keystone';
import Message from '../../keystone/chat/message';
import SystemMessage from './components/SystemMessage/SystemMessage';
import UserMessage from './components/UserMessage';
import useStyles from './styles';

interface MessageListProps {
  messages: Message[];
}

export const cache = new CellMeasurerCache({
  // defaultHeight: 55,
  fixedWidth: true,
});

const MessageList: FC<MessageListProps> = (props) => {
  const classes = useStyles();
  const { messages = [] } = props;
  const { auth } = useKeystone();
  const listRef = createRef<List>();
  const scrollRef = createRef<Scrollbars>();

  const handleScroll = (e: React.UIEvent) => {
    const { scrollTop, scrollLeft } = e.target as unknown as positionValues;
    listRef.current?.Grid?.handleScrollEvent({ scrollTop, scrollLeft });
  };

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToBottom();
    }, 0);
  }, [messages]);

  const messageRenderer = ({ index, key, style, parent }: ListRowProps) => {
    const msg = messages[index];

    if (!msg) {
      return null;
    }

    return (
      <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        {({ registerChild }) => {
          const cellMeasurerChild = registerChild as unknown as RefObject<HTMLDivElement>;
          const short =
            msg.user?.current.id === messages[index - 1]?.user?.current.id &&
            messages[index - 1].type !== MessageTypeEnum.System;
          const nextShort =
            msg.user?.current.id === messages[index + 1]?.user?.current.id &&
            messages[index + 1].type !== MessageTypeEnum.System;
          return (
            <div
              ref={cellMeasurerChild}
              className={classes.messageContainer}
              style={{ ...style, paddingTop: short ? 0 : 12, paddingBottom: nextShort ? 0 : 12 }}
            >
              {msg.user && msg.type === MessageTypeEnum.User ? (
                <UserMessage
                  short={short}
                  own={msg.user.current.id === `${auth.me.id}`}
                  user={msg.user.current}
                  message={msg.text}
                  date={new Date(msg.createdAt)}
                />
              ) : (
                msg.user &&
                msg.type === MessageTypeEnum.System && <SystemMessage key={key} user={msg.user.current} />
              )}
            </div>
          );
        }}
      </CellMeasurer>
    );
  };

  return (
    <div className={classes.messages}>
      <AutoSizer>
        {({ width, height }) => (
          <Scrollbars
            autoHide
            ref={scrollRef}
            onScroll={(e) => handleScroll(e)}
            style={{ width, height: height - CHAT_MESSAGE_SUBMIT_FOOTER_HEIGHT }}
          >
            <List
              ref={listRef}
              style={{
                overflow: 'visible',
              }}
              width={width}
              height={height}
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              rowRenderer={messageRenderer}
              rowCount={messages.length}
              scrollToIndex={messages.length - 1}
              overscanRowCount={2}
            />
          </Scrollbars>
        )}
      </AutoSizer>
    </div>
  );
};

export default observer(MessageList);
