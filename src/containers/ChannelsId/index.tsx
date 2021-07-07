import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useHistory, useParams } from 'react-router-dom';

import MessageInput from 'components/MessageInput';
import MessageList from 'components/MessageList';
import ChatFooter from 'components/Footer';
import ChatHeader from 'components/Header';
import SubHeader from 'components/SubHeader';
import { Avatar } from 'ui-kit';

import { TChannel } from 'types/channels';
import { TMessage } from 'types/messages';

import useStores from 'stores/root';

import Routes from 'routes';

import { getChannelUsers } from 'utils/users';

import styles from './ChannelsId.module.scss';

const MAX_USERS_ON_PREVIEW = 2;

interface ParamTypes {
  id: number | null;
}

const PageChannelsId: FC<ParamTypes> = observer((props) => {
  const { id: channelId } = props;
  const { channelsStore, chatStore } = useStores();

  if (channelId === null) {
    return null;
  }

  const currentChannel: TChannel | null = channelsStore.getChannel(channelId) || null;
  const channelMessages: TMessage[] = channelsStore.getSortedMessages(channelId);
  const channelUsersIds = currentChannel?.userIds || [];

  const users = getChannelUsers(channelUsersIds, chatStore.users);

  const onClick = () => {
    chatStore.setRoute(Routes.Users);
  };

  if (!currentChannel) {
    return null;
  }

  return (
    <>
      <ChatHeader title="Chat" />
      <SubHeader
        rightButton={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <>
            <button className={styles.userList} type="button" onClick={onClick}>
              {users.slice(0, MAX_USERS_ON_PREVIEW).map((item) => (
                <div key={item.id}>
                  <Avatar username={item?.username || ''} url={item?.avatarUrl || ''} />
                </div>
              ))}
              {users.length > MAX_USERS_ON_PREVIEW && (
                <div className={styles.circle}>{users.length - MAX_USERS_ON_PREVIEW}</div>
              )}
            </button>
          </>
        }
      >
        <div>{currentChannel?.name}</div>
      </SubHeader>
      <MessageList messages={channelMessages} />
      <ChatFooter>
        <MessageInput channelId={Number(channelId)} type="channel" />
      </ChatFooter>
    </>
  );
});

export default PageChannelsId;
