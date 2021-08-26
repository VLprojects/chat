import MessageInput from 'components/MessageInput';
import MessageList from 'components/MessageList';
import useKeystone from 'keystone';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import Routes from 'routes';
import { Avatar, Image } from 'ui-kit';
import ChevronLeftIcon from 'ui-kit/assets/icons/chevron-left.svg';
import { getChatWithUser, getDirectChannelName } from '../../components/DirectList/service';
import { ChannelTypeEnum } from '../../types/enums';
import useStyles from './styles';

const MAX_USERS_ON_PREVIEW = 2;

const ChannelPage: FC = observer(() => {
  const classes = useStyles();
  const root = useKeystone();
  const { ui, chat, settings } = root;

  const channelId = String(ui.params.id);
  const currentChannel = chat.channels.get(channelId);
  if (!currentChannel) {
    return null;
  }
  const backUrl = currentChannel.type === ChannelTypeEnum.Direct ? Routes.Direct : Routes.Channels;

  const onAvatarsClick = () => {
    ui.setRoute(`${Routes.Users}/${channelId}`);
  };

  return (
    <div className={classes.pageWrapper}>
      <div className={classes.subHeaderWrapper}>
        {settings.displayChannelList && (
          <div className={classes.subHeaderBack} onClick={() => ui.setRoute(backUrl)}>
            <Image src={ChevronLeftIcon} alt="route icon" />
          </div>
        )}
        <div className={classes.chatNameTitle}>
          {currentChannel.type === ChannelTypeEnum.Direct
            ? getDirectChannelName(root, currentChannel.id)
            : currentChannel?.name}
        </div>

        {currentChannel.type === ChannelTypeEnum.Direct ? (
          <Avatar url={getChatWithUser(root, currentChannel.id)?.avatarUrl} />
        ) : (
          <div className={classes.avatarWrapper} onClick={onAvatarsClick}>
            {currentChannel.userList.slice(0, MAX_USERS_ON_PREVIEW).map((item) => (
              <Avatar key={item.id} url={item.avatarUrl} />
            ))}
            {currentChannel.userList.length > MAX_USERS_ON_PREVIEW && (
              <Avatar counter={currentChannel.userList.length - MAX_USERS_ON_PREVIEW} />
            )}
          </div>
        )}
      </div>

      <MessageList messages={currentChannel.sortedMessages} />
      <div className={classes.footer}>
        <MessageInput channelId={channelId} />
      </div>
    </div>
  );
});

export default ChannelPage;
