import ChatFooter from 'components/Footer';
import ChatHeader from 'components/Header';
import MessageInput from 'components/MessageInput';
import MessageList from 'components/MessageList';
import SubHeader from 'components/SubHeader';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import Routes from 'routes';
import useStores from 'stores/rootStore';
import { Avatar } from 'ui-kit';
import styles from './ChannelsId.module.scss';

const MAX_USERS_ON_PREVIEW = 2;

const PageChannelsId: FC = observer(() => {
  const { channelsStore, chatStore } = useStores();
  // todo causes console warning
  const channelId = Number(chatStore.params.id);

  if (channelId === null) {
    return null;
  }

  const currentChannel = channelsStore.getChannel(channelId);
  if (!currentChannel) {
    return null;
  }

  const channelMessages = channelsStore.getSortedMessages(channelId);
  // const users = chatStore.getUsers(currentChannel.userIds);

  const onClick = () => {
    chatStore.setRoute(`${Routes.Users}/${currentChannel.id}`);
  };

  return (
    <>
      <ChatHeader title="Chat" />
      {/* <SubHeader
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
      </SubHeader> */}
      <MessageList messages={channelMessages} />
      <ChatFooter>
        <MessageInput channelId={Number(channelId)} type="channel" />
      </ChatFooter>
    </>
  );
});

export default PageChannelsId;
