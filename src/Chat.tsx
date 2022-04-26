import { ErrorBoundary } from '@sentry/react';
import CssBaseline from '@mui/material/CssBaseline';
import { LinearProgress } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { createGenerateClassName, StylesProvider } from '@mui/styles';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';
import App from './App';
import useEventHook from './hooks/useEventHook';
import useKeystone from './keystone';
import theme from './theme/theme';
import { getStoredAccessToken } from './utils/auth';
import { findAppInitialData } from './utils/common';
import { EventBusEventEnum, IEvents, ListenerEventEnum } from './utils/eventBus/types';
import { initializeApi } from './api';
import { getSettings } from './keystone/service';
import LoadingStatus from './components/LoadingStatus';
import eventBus from 'utils/eventBus';
import locale from 'locales';

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
  const { lang } = root.ui;

  if (onEvent) {
    useEventHook(ListenerEventEnum.App, onEvent);
  }

  const generateClassName = createGenerateClassName({
    productionPrefix: 'vlprojects-chat',
  });

  useEffect(() => {
    // Load global app settings first
    (async () => {
      setIsReady(false);
      root.init();

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
        eventBus.emit(ListenerEventEnum.App, {
          event: EventBusEventEnum.ChatLoaded,
        });
      }
    })();
  }, [channelId, appId, apiUrl, userToken]);

  return (

      <ErrorBoundary fallback={() => <FormattedMessage id="globalError" />}>
        <StyledEngineProvider injectFirst>
          <StylesProvider generateClassName={generateClassName}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <IntlProvider locale={lang} messages={locale[lang as 'en' | 'ru']} >
              {isReady ? (
                  <App />
                  ) : (
                    <>
                  <LinearProgress color="secondary" />
                  <LoadingStatus intlId="loadingSettings" />
                </>
              )}
              </IntlProvider>
            </ThemeProvider>
          </StylesProvider>
        </StyledEngineProvider>
      </ErrorBoundary>

  );
});
