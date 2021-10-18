import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { RawIntlProvider } from 'react-intl';
import App from './App';
import useEventHook from './hooks/useEventHook';
import useKeystone from './keystone';
import { getSettings } from './keystone/service';
import theme from './theme/theme';
import { getStoredAccessToken } from './utils/auth';
import { findAppInitialData } from './utils/common';
import { IEvents, ListenerEventEnum } from './utils/eventBus/types';
import intl from './utils/intl';

export interface IChatProps {
  appId?: string;
  channelId?: string;
  userToken?: string;
  onEvent?: (data: IEvents) => void;
}

export const Chat: FC<IChatProps> = observer((props) => {
  const { appId, channelId, userToken, onEvent } = props;
  const [tokenInit, setTokenInit] = useState(false);

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
    }
    setTokenInit(true);
  }, []);

  if (!tokenInit) return null;

  return (
    <StylesProvider generateClassName={generateClassName}>
      <RawIntlProvider value={intl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </RawIntlProvider>
    </StylesProvider>
  );
});
