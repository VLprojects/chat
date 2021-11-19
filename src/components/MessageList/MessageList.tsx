import { Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { createRef, FC, RefObject, useEffect, useRef, useState } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowProps } from 'react-virtualized';
import { MessageTypeEnum, UserRoleEnum } from 'types/enums';
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

function easeInOutQuint(t: number) {
  // eslint-disable-next-line no-plusplus
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}

const MessageList: FC<MessageListProps> = (props) => {
  const classes = useStyles();
  const { messages = [] } = props;
  const [scrollTop, setScrollTop] = useState<number>();
  const { auth, ui } = useKeystone();
  const listRef = createRef<List>();
  const scrollTopInitial = useRef<number>();
  const animationStartTime = useRef<number>();

  const onScroll = ({ scrollTop: _scrollTop }: { scrollTop: number }) => {
    if (!animationStartTime.current) {
      scrollTopInitial.current = _scrollTop;
    }
  };

  const jumpToMessage = () => {
    const scrollTopFinal = listRef?.current?.getOffsetForRow({
      index: ui.pinnedMessageIdx.msgIdx,
    });
    const animate = () => {
      requestAnimationFrame(() => {
        const duration = 1000;

        const now = performance.now();
        if (
          animationStartTime.current &&
          (scrollTopFinal || scrollTopFinal === 0) &&
          (scrollTopInitial.current || scrollTopInitial.current === 0)
        ) {
          const ellapsed = now - animationStartTime.current;
          const scrollDelta = scrollTopFinal - scrollTopInitial.current;
          const easedTime = easeInOutQuint(Math.min(1, ellapsed / duration));
          const calculatedScrollTop = scrollTopInitial.current + scrollDelta * easedTime;

          setScrollTop(calculatedScrollTop);
          if (ellapsed < duration) {
            animate();
          } else {
            animationStartTime.current = undefined;
            scrollTopInitial.current = scrollTopFinal;
            setScrollTop(undefined);
          }
        }
      });
    };
    animationStartTime.current = performance.now();
    animate();
  };

  useEffect(() => {
    if (ui.pinnedMessageIdx.msgIdx || ui.pinnedMessageIdx.msgIdx === 0) {
      jumpToMessage();
    }
  }, [ui.pinnedMessageIdx]);

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
                  messageId={+msg.id}
                  date={new Date(msg.createdAt)}
                  isModerator={auth.me.role === UserRoleEnum.Moderator}
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
    <Grid item xs>
      <AutoSizer>
        {({ width, height }) => (
          <List
            ref={listRef}
            width={width}
            height={height}
            deferredMeasurementCache={cache}
            rowHeight={cache.rowHeight}
            rowRenderer={messageRenderer}
            rowCount={messages.length}
            scrollToIndex={messages.length - 1}
            scrollTop={scrollTop}
            onScroll={onScroll}
            overscanRowCount={2}
          />
        )}
      </AutoSizer>
    </Grid>
  );
};

export default observer(MessageList);
