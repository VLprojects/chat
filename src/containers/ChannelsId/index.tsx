import ChatFooter from 'components/Footer';
import ChatHeader from 'components/Header';
import MessageInput from 'components/MessageInput';
import MessageList from 'components/MessageList';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import Routes from 'routes';
import useStores from 'stores/rootStore';
import { Avatar, Image } from 'ui-kit';
import ChevronLeftIcon from 'ui-kit/assets/icons/chevron-left.svg';
import { getChannelUsers } from 'utils/users';
import { IChannel } from '../../stores/chatStore/types';
import styles from './ChannelsId.module.scss';

const MAX_USERS_ON_PREVIEW = 2;

const PageChannelsId: FC = observer(() => {
  const { channelsStore, chatStore } = useStores();
  const channelId = Number(chatStore.params.id);

  if (channelId === null) {
    return null;
  }

  const currentChannel: IChannel | null = channelsStore.getChannel(channelId) || null;
  const channelMessages = channelsStore.getSortedMessages(channelId);
  const channelUsersIds = currentChannel?.userIds || [];

  const users = getChannelUsers(channelUsersIds, chatStore.users);

  const onAvatarsClick = () => {
    chatStore.setRoute(Routes.Users);
  };
  const backClickHandler = () => {
    chatStore.setRoute(Routes.Channels);
  };

  if (!currentChannel) {
    return null;
  }

  return (
    <>
      <ChatHeader title="Chat" />
      <div className={styles.subHeaderWrapper}>
        <div className={styles.subHeaderBack} onClick={backClickHandler}>
          <Image src={ChevronLeftIcon} alt="route icon" />
        </div>
        <div className={styles.chatNameTitle}>{currentChannel?.name}</div>
        <div className={styles.avatarWrapper} onClick={onAvatarsClick}>
          {users.slice(0, MAX_USERS_ON_PREVIEW).map((item) => (
            <Avatar key={item.id} url={item?.avatarUrl} />
          ))}
          {users.length > MAX_USERS_ON_PREVIEW && <Avatar counter={users.length - MAX_USERS_ON_PREVIEW} />}
        </div>
      </div>

      <MessageList messages={channelMessages} />
      <ChatFooter>
        <MessageInput channelId={Number(channelId)} type="channel" />
      </ChatFooter>
    </>
  );
});

export default PageChannelsId;
