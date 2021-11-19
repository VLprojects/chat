import { Typography } from '@mui/material';
import MessageInput from 'components/MessageInput';
import MessageList from 'components/MessageList';
import PinnedMessageList from 'components/PinnedMessageList';
import SubHeader from 'components/SubHeader';
import useKeystone from 'keystone';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Routes from 'routes';
import { Button } from 'ui-kit';
import { getDirectChannelName } from '../../components/DirectList/service';
import { ChannelTypeEnum, UserRoleEnum } from '../../types/enums';
import ChannelName from '../../ui-kit/ChannelName';
import PollPortal from '../PollPortal';
import { getPinnedMessages } from './service';

// const MAX_USERS_ON_PREVIEW = 2;

const ChannelPage: FC = observer(() => {
  // const classes = useStyles();
  const root = useKeystone();
  const { ui, chat, settings, auth } = root;
  const channelId = String(ui.params.id);
  const currentChannel = chat.channels.get(channelId);

  useEffect(() => {
    getPinnedMessages(root, channelId);
  }, []);

  if (!currentChannel) {
    return null;
  }
  const backUrl = currentChannel.type === ChannelTypeEnum.Direct ? Routes.Direct : Routes.Channels;

  // const onAvatarsClick = () => {
  //   ui.setRoute(`${Routes.Users}/${channelId}`);
  // };

  const onPollsClick = () => {
    ui.setRoute(`${Routes.Polls}/${channelId}`);
  };

  return (
    <>
      <SubHeader onBack={settings.displayChannelList ? () => ui.setRoute(backUrl) : undefined}>
        <ChannelName
          name={
            currentChannel.type === ChannelTypeEnum.Direct
              ? getDirectChannelName(root, currentChannel.id)
              : currentChannel?.name
          }
        />

        {auth.me.role === UserRoleEnum.Moderator && (
          <div style={{ marginLeft: 32 }}>
            <Button variant="link" onClick={onPollsClick}>
              <Typography>
                <FormattedMessage id="polls" />
              </Typography>
            </Button>
          </div>
        )}

        {
          // TODO No Link to channel's users in current design.
        }

        {/* <div style={{ marginLeft: 'auto' }}>
          {currentChannel.type === ChannelTypeEnum.Direct ? (
            <Avatar src={getChatWithUser(root, currentChannel.id)?.avatarUrl} size="sm" />
          ) : (
            <AvatarGroup max={MAX_USERS_ON_PREVIEW} classes={{ avatar: classes.avatarGroup }} spacing={5}>
              {currentChannel.userList.map((item) => (
                <Avatar key={item.id} src={item?.avatarUrl} size="sm" onClick={onAvatarsClick} />
              ))}
            </AvatarGroup>
          )}
        </div> */}
      </SubHeader>
      <PinnedMessageList />
      <MessageList messages={currentChannel.sortedMessages} />

      <MessageInput channelId={channelId} />

      <PollPortal />
    </>
  );
});

export default ChannelPage;
