import { Typography } from '@mui/material';
import cls from 'classnames';
import { createOrOpenDirectChat } from 'containers/UsersListPage/services';
import useKeystone from 'keystone';
import User from 'keystone/chat/user';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { ChannelTypeEnum } from 'types/enums';
import useStyles from './styles';

interface IProps {
  user: User;
  own: boolean;
}

const UserMessageDisplayName: FC<IProps> = (props) => {
  const { user, own } = props;
  const classes = useStyles();

  const root = useKeystone();
  const { ui, chat, settings } = root;
  const channelId = String(ui.params.id);
  const currentChannel = chat.channels.get(channelId);

  const directAllowed = settings.displayDirect;
  const publicChannel = currentChannel?.type === ChannelTypeEnum.Public;

  const directMessageConditions = directAllowed && publicChannel && !own;

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

export default observer(UserMessageDisplayName);
