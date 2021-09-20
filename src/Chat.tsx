import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles';
import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import App from './App';
import theme from './theme/theme';
import useKeystone from './keystone';
import { getSettings, redirectToInitial } from './keystone/service';
import { getStoredAccessToken } from './utils/auth';
import { findAppInitialData } from './utils/common';
import { IEvents, ListenerEventEnum } from './utils/eventBus/types';
import useEventHook from './hooks/useEventHook';

export interface IChatProps {
  appId?: string;
  channelId?: string;
  userToken?: string;
  onEvent?: (data: IEvents) => void;
}

export const Chat: FC<IChatProps> = observer((props) => {
  const { appId, channelId, userToken, onEvent } = props;
  const root = useKeystone();
  if (onEvent) {
    useEventHook(ListenerEventEnum.App, onEvent);
  }

  const generateClassName = createGenerateClassName({
    productionPrefix: 'vlprojects-chat',
  });

  useEffect(() => {
    const { appIdFromAttr, channelIdFromAttr } = findAppInitialData();
    root.auth.setAppId(appIdFromAttr || appId || '');
    if (channelIdFromAttr || channelId) {
      root.ui.setChannelId(channelIdFromAttr || channelId || '');
    }

    if (root.auth.appId) {
      getSettings(root, root.auth.appId);
    }

    const token = userToken || getStoredAccessToken();
    if (token) {
      root.auth.setAccessToken(token);
      redirectToInitial(root);
    }
  });

  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StylesProvider>
  );
});
