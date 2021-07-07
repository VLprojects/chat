import PageChannelsId from 'containers/ChannelsId';
import Profile from 'containers/Profile';
import SocketLayout from 'containers/SocketLayout';
import PageUsersList from 'containers/UsersList';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import Routes from 'routes';
import useStores from 'stores/root';
import 'ui-kit/styles/common.scss';
import styles from './Chat.module.scss';
import { findAppInitialData } from './utils/common';

export interface IChatProps {
  username?: string;
  apiToken?: string;
  apiBaseUrl?: string;
  channelId?: number;
  route?: string;
}

export const Chat: FC<IChatProps> = observer((props) => {
  let { apiToken, channelId } = props;
  const { username } = props;
  const { chatStore, authStore, channelsStore, socketStore } = useStores();

  if (!apiToken || !channelId) {
    const { apiTokenFromAttr, channelIdFromAttr } = findAppInitialData();

    if (!apiTokenFromAttr || !channelIdFromAttr) {
      return <div>Can&apos;t initialize app.</div>;
    }
    apiToken = apiTokenFromAttr;
    channelId = Number(channelIdFromAttr);
  }

  chatStore.setApiToken(apiToken);

  useEffect(() => {
    if (username && !authStore.isAuthorized) {
      authStore.signup(username);
    }
  }, [username]);

  useEffect(() => {
    const joinChannel = async () => {
      if (channelId && socketStore.inited) {
        await channelsStore.joinChannel(channelId);
        chatStore.setChannelId(channelId);
      }
    };
    joinChannel();
  }, [socketStore.inited]);

  if (!authStore.isAuthorized) {
    return <div>Not authorized</div>;
  }

  return (
    <div className={styles.app}>
      <SocketLayout>
        {chatStore.route === Routes.Users && <PageUsersList />}
        {chatStore.route === Routes.Profile && <Profile />}
        {chatStore.route === '' && <PageChannelsId id={+channelId} />}
      </SocketLayout>
    </div>
  );
});
