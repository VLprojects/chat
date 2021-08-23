import useKeystone from 'keystone';
import React, { FC } from 'react';
import Routes from 'routes';
import { Image } from 'ui-kit';
import ChatMinimize from 'ui-kit/assets/icons/chat-minimize.svg';
import useStyles from './styles';

interface IChatHeader {
  title: string;
  showProfile?: boolean;
}

const ChatHeader: FC<IChatHeader> = (props) => {
  const classes = useStyles();
  const { title } = props;
  const { ui } = useKeystone();

  return (
    <div className={classes.header}>
      <div className={classes.icon} onClick={() => ui.setRoute(Routes.Channels)}>
        <Image src={ChatMinimize} alt="" />
      </div>
      <div className={classes.title}>{title}</div>
    </div>
  );
};

export default ChatHeader;
