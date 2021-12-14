import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { createGenerateClassName, StylesProvider } from '@mui/styles';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { RawIntlProvider } from 'react-intl';
import App from './App';
import useEventHook from './hooks/useEventHook';
import useKeystone from './keystone';
import theme from './theme/theme';
import { getStoredAccessToken } from './utils/auth';
import { findAppInitialData } from './utils/common';
import { IEvents, ListenerEventEnum } from './utils/eventBus/types';
import intl from './utils/intl';
import { initializeApi } from './api';
import { getSettings } from './keystone/service';

export interface IChatProps {
  apiUrl?: string;
  appId?: string;
  channelId?: string;
  userToken?: string;
  onEvent?: (data: IEvents) => void;
}

export const Chat: FC<IChatProps> = observer((props) => {
  const { apiUrl, appId, channelId, userToken, onEvent } = props;
  const [tokenInit, setTokenInit] = useState(false);

  const root = useKeystone();
  if (onEvent) {
    useEventHook(ListenerEventEnum.App, onEvent);
  }

  const generateClassName = createGenerateClassName({
    productionPrefix: 'vlprojects-chat',
  });

  useEffect(() => {
    const { apiUrlFromAttr, appIdFromAttr, channelIdFromAttr } = findAppInitialData();
    root.auth.setAppId(appIdFromAttr || appId || '');
    initializeApi(apiUrlFromAttr || apiUrl || process.env.REACT_APP_API_BASEURL || '');
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
    <StyledEngineProvider injectFirst>
      <StylesProvider generateClassName={generateClassName}>
        <RawIntlProvider value={intl}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </RawIntlProvider>
      </StylesProvider>
    </StyledEngineProvider>
  );
});
