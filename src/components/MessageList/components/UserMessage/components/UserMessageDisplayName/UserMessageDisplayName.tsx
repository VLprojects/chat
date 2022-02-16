import { Typography } from '@mui/material';
import cls from 'classnames';
import { createOrOpenDirectChat } from 'containers/UsersListPage/services';
import useKeystone from 'keystone';
import User from 'keystone/chat/user';
import React, { FC, memo } from 'react';
import { ChannelTypeEnum } from 'types/enums';
import useStyles from './styles';

interface IProps {
  user: User;
}

const UserMessageDisplayName: FC<IProps> = (props) => {
  const { user } = props;
  const classes = useStyles();

  const root = useKeystone();
  const { ui, chat, settings, auth } = root;
  const channelId = String(ui.params.id);
  const currentChannel = chat.channels.get(channelId);

  const directAllowed = settings.displayDirect;
  const publicChannel = currentChannel?.type === ChannelTypeEnum.Public;
  const selfMessage = +user.id === +auth.me.id;

  const directMessageConditions = directAllowed && publicChannel && !selfMessage;

  const openNewChat = () => {
    if (directMessageConditions) {
      createOrOpenDirectChat(root, user);
    }
  };

  return (
    <Typography
      variant="body2"
      fontWeight={600}
      onClick={openNewChat}
      className={cls({ [classes.link]: directMessageConditions })}
    >
      {user?.displayName}
    </Typography>
  );
};

export default memo(UserMessageDisplayName);
