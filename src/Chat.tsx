import { Router } from 'components/Router';
import AuthLayout from 'containers/AuthLayout';
import Channels from 'containers/Channels';
import PageChannelsId from 'containers/ChannelsId';
import Profile from 'containers/Profile';
import SocketLayout from 'containers/SocketLayout';
import PageUsersList from 'containers/UsersList';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import Routes from 'routes';
import useStores from 'stores/rootStore';
import 'ui-kit/styles/common.scss';
import styles from './Chat.module.scss';
import { getStoredAccessToken } from './utils/auth';
import { findAppInitialData } from './utils/common';

export interface IChatProps {
  apiToken?: string;
  channelId?: string;
  userToken?: string;
}

export const Chat: FC<IChatProps> = observer((props) => {
  const { apiToken, channelId, userToken } = props;

  const { chatStore, authStore } = useStores();

  useEffect(() => {
    const { apiTokenFromAttr, channelIdFromAttr } = findAppInitialData();
    authStore.setApiToken(apiTokenFromAttr || apiToken || null);
    console.log(channelIdFromAttr, channelId);
    if (channelIdFromAttr || channelId) {
      chatStore.setChannelId(channelIdFromAttr || channelId || null);
    }

    const token = userToken || getStoredAccessToken();
    if (token) {
      authStore.setToken(token);
    }
  });

  if (!authStore.apiToken) {
    return <div>Can&apos;t initialize app.</div>;
  }

  return (
    <div className={styles.app}>
      <AuthLayout>
        <SocketLayout>
          <Router route={Routes.Profile}>
            <Profile />
          </Router>
          <Router route={Routes.Users}>
            <PageUsersList />
          </Router>
          <Router route={Routes.Channels}>
            <Channels channelTabType={Routes.Channels} />
          </Router>
          <Router route={`${Routes.Channels}/:id`}>
            <PageChannelsId />
          </Router>
        </SocketLayout>
      </AuthLayout>
    </div>
  );
});
