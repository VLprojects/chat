import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import PageChannelsId from 'containers/ChannelsId';
import PageUsersList from 'containers/UsersList';
import Routes from 'routes';
import Profile from 'containers/Profile';
import SocketLayout from 'containers/SocketLayout';

import useStores from 'stores/root';

import styles from './Chat.module.scss';
import 'ui-kit/styles/common.scss';

export type IChatProps = {
  username?: string,
  apiToken?: string,
  apiBaseUrl?: string,
  channelId: number,
  route?: string,
};

export const Chat: FC<IChatProps> = observer((props) => {
  const {
    username = '',
    apiToken = '',
    channelId = '',
  } = props;

  const { chatStore, authStore, channelsStore, socketStore } = useStores();
  const [currentChannelId, setCurrentChannelId] = useState(0);

  chatStore.setApiToken(apiToken);
  chatStore.setApiBaseUrl(process.env.REACT_APP_API_BASEURL || 'http://localhost:3001/api');

  useEffect(() => {
    if (username.length > 0 && !authStore.isAuthorized) {
      authStore.signup(username);
    }
  }, [username]);

  useEffect(() => {
    const joinChannel = async () => {
      if (channelId && socketStore.inited) {
        await channelsStore.joinChannel(channelId);
        setCurrentChannelId(channelId);
        chatStore.setChannelId(channelId);
      }
    };
    joinChannel();
  }, [socketStore.inited]);

  if (!authStore.isAuthorized) {
    return (
      <div>Not authorized</div>
    );
  }

  return (
    <div className={styles.app}>
      <SocketLayout>
        {chatStore.route === Routes.Users && <PageUsersList />}
        {chatStore.route === Routes.Profile && <Profile />}
        {chatStore.route === '' && <PageChannelsId id={currentChannelId} />}
      </SocketLayout>
    </div>
  );
});
