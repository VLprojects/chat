import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import CssBaseline from '@mui/material/CssBaseline';
import { LinearProgress } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { createGenerateClassName, StylesProvider } from '@mui/styles';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { RawIntlProvider, FormattedMessage } from 'react-intl';
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
import LoadingStatus from './components/LoadingStatus';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    release: process.env.REACT_APP_VERSION || 'unknown',
    environment: process.env.NODE_ENV || 'unknown',
    ignoreErrors: ['ResizeObserver loop limit exceeded'],
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

export interface IChatProps {
  apiUrl?: string;
  appId?: string;
  channelId?: string;
  userToken?: string;
  onEvent?: (data: IEvents) => void;
}

export const Chat: FC<IChatProps> = observer((props) => {
  const { apiUrl, appId, channelId, userToken, onEvent } = props;
  const [isReady, setIsReady] = useState(false);

  const root = useKeystone();
  if (onEvent) {
    useEventHook(ListenerEventEnum.App, onEvent);
  }

  const generateClassName = createGenerateClassName({
    productionPrefix: 'vlprojects-chat',
  });

  useEffect(() => {
    // Load global app settings first
    (async () => {
      const { apiUrlFromAttr, appIdFromAttr, channelIdFromAttr } = findAppInitialData();
      root.auth.setAppId(appIdFromAttr || appId || '');
      initializeApi(apiUrlFromAttr || apiUrl || process.env.REACT_APP_API_BASEURL || '');
      if (channelIdFromAttr || channelId) {
        root.ui.setChannelId(channelIdFromAttr || channelId || '');
      }

      if (root.auth.appId) {
        await getSettings(root, root.auth.appId);

        const token = userToken || getStoredAccessToken();
        if (token) {
          root.auth.setAccessToken(token);
        }

        setIsReady(true);
      }
    })();
  }, []);

  return (
    <RawIntlProvider value={intl}>
      <Sentry.ErrorBoundary fallback={() => <FormattedMessage id="globalError" />}>
        <StyledEngineProvider injectFirst>
          <StylesProvider generateClassName={generateClassName}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {isReady ? (
                <App />
              ) : (
                <>
                  <LinearProgress color="secondary" />
                  <LoadingStatus intlId="loadingSettings" />
                </>
              )}
            </ThemeProvider>
          </StylesProvider>
        </StyledEngineProvider>
      </Sentry.ErrorBoundary>
    </RawIntlProvider>
  );
});
