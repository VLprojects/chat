import { Typography } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import MessageInput from 'components/MessageInput';
import MessageList from 'components/MessageList';
import SubHeader from 'components/SubHeader';
import { FormattedMessage } from 'react-intl';
import useKeystone from 'keystone';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import Routes from 'routes';
import { Avatar, Button } from 'ui-kit';
import { getChatWithUser, getDirectChannelName } from '../../components/DirectList/service';
import { ChannelTypeEnum, UserRoleEnum } from '../../types/enums';
import ChannelName from '../../ui-kit/ChannelName';
import PollPortal from '../PollPortal';
import useStyles from './styles';

const MAX_USERS_ON_PREVIEW = 2;

const ChannelPage: FC = observer(() => {
  const classes = useStyles();
  const root = useKeystone();
  const { ui, chat, settings, auth } = root;

  const channelId = String(ui.params.id);
  const currentChannel = chat.channels.get(channelId);
  if (!currentChannel) {
    return null;
  }
  const backUrl = currentChannel.type === ChannelTypeEnum.Direct ? Routes.Direct : Routes.Channels;

  const onAvatarsClick = () => {
    ui.setRoute(`${Routes.Users}/${channelId}`);
  };
  const onPollsClick = () => {
    ui.setRoute(`${Routes.Polls}/${channelId}`);
  };

  return (
    <div className={classes.pageWrapper}>
      <SubHeader onBack={settings.displayChannelList ? () => ui.setRoute(backUrl) : undefined}>
        <ChannelName
          name={
            currentChannel.type === ChannelTypeEnum.Direct
              ? getDirectChannelName(root, currentChannel.id)
              : currentChannel?.name
          }
        />

        {auth.me.role === UserRoleEnum.Moderator && (
          <div style={{ marginLeft: 20 }}>
            <Button variant="submit" size="medium" onClick={onPollsClick}>
              <Typography variant="h4">
                <FormattedMessage id="polls" />
              </Typography>
            </Button>
          </div>
        )}

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

      <MessageList messages={currentChannel.sortedMessages} />
      <div className={classes.footer}>
        <MessageInput channelId={channelId} />
      </div>
      <PollPortal />
    </div>
  );
});

export default ChannelPage;
