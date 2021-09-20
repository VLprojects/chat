import { Typography } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import MessageInput from 'components/MessageInput';
import MessageList from 'components/MessageList';
import SubHeader from 'components/SubHeader';
import useKeystone from 'keystone';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import Routes from 'routes';
import { Avatar } from 'ui-kit';
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
      {settings.displayHeader && (
        <SubHeader onBack={settings.displayChannelList ? () => ui.setRoute(backUrl) : undefined}>
          <Typography variant="h4">
            {currentChannel.type === ChannelTypeEnum.Direct
              ? getDirectChannelName(root, currentChannel.id)
              : currentChannel?.name}
          </Typography>
          <div style={{ marginLeft: 'auto' }}>
            {currentChannel.type === ChannelTypeEnum.Direct ? (
              <Avatar src={getChatWithUser(root, currentChannel.id)?.avatarUrl} size="sm" />
            ) : (
              <AvatarGroup max={MAX_USERS_ON_PREVIEW} classes={{ avatar: classes.avatarGroup }} spacing={5}>
                {currentChannel.userList.map((item) => (
                  <Avatar key={item.id} src={item?.avatarUrl} size="sm" onClick={onAvatarsClick} />
                ))}
              </AvatarGroup>
            )}
          </div>
        </SubHeader>
      )}

      <MessageList messages={currentChannel.sortedMessages} />
      <div className={classes.footer}>
        <MessageInput channelId={channelId} />
      </div>
    </div>
  );
});

export default ChannelPage;
