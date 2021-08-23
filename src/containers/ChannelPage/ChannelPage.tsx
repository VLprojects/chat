import ChatFooter from 'components/Footer';
import ChatHeader from 'components/Header';
import MessageInput from 'components/MessageInput';
import MessageList from 'components/MessageList';
import useKeystone from 'keystone';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import Routes from 'routes';
import { Avatar, Image } from 'ui-kit';
import ChevronLeftIcon from 'ui-kit/assets/icons/chevron-left.svg';
import useStyles from './styles';

const MAX_USERS_ON_PREVIEW = 2;

const ChannelPage: FC = observer(() => {
  const classes = useStyles();
  const { ui, chat } = useKeystone();

  const channelId = String(ui.params.id);
  const currentChannel = chat.channels.get(channelId);
  if (!currentChannel) {
    return null;
  }

  const onAvatarsClick = () => {
    ui.setRoute(`${Routes.Users}/${channelId}`);
  };
  const backClickHandler = () => {
    ui.setRoute(Routes.Channels);
  };

  return (
    <div className={classes.pageWrapper}>
      <ChatHeader title="Chat" />
      <div className={classes.subHeaderWrapper}>
        <div className={classes.subHeaderBack} onClick={backClickHandler}>
          <Image src={ChevronLeftIcon} alt="route icon" />
        </div>
        <div className={classes.chatNameTitle}>{currentChannel?.name}</div>
        <div className={classes.avatarWrapper} onClick={onAvatarsClick}>
          {currentChannel.users.slice(0, MAX_USERS_ON_PREVIEW).map((item) => (
            <Avatar key={item.id} url={item.current.avatarUrl} />
          ))}
          {currentChannel.users.length > MAX_USERS_ON_PREVIEW && (
            <Avatar counter={currentChannel.users.length - MAX_USERS_ON_PREVIEW} />
          )}
        </div>
      </div>

      <MessageList messages={currentChannel.sortedMessages} />
      <ChatFooter>
        <MessageInput channelId={channelId} />
      </ChatFooter>
    </div>
  );
});

export default ChannelPage;
