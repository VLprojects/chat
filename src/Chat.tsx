import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles';
import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import App from './App';
import theme from './theme/theme';
import useKeystone from './keystone';
import { redirectToInitial } from './keystone/service';
import { getStoredAccessToken } from './utils/auth';
import { findAppInitialData } from './utils/common';

export interface IChatProps {
  appId?: string;
  channelId?: string;
  userToken?: string;
}

export const Chat: FC<IChatProps> = observer((props) => {
  const { appId, channelId, userToken } = props;
  const root = useKeystone();

  const generateClassName = createGenerateClassName({
    productionPrefix: 'vlprojects-chat',
  });

  useEffect(() => {
    const { appIdFromAttr, channelIdFromAttr } = findAppInitialData();
    root.auth.setAppId(appIdFromAttr || appId || '');
    if (channelIdFromAttr || channelId) {
      root.ui.setChannelId(channelIdFromAttr || channelId || '');
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
