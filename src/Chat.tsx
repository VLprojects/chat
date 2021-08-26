import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles';
import { Router } from 'components/Router';
import AuthLayout from 'containers/AuthLayout';
import ChannelPage from 'containers/ChannelPage';
import Channels from 'containers/Channels';
import Profile from 'containers/Profile';
import SocketLayout from 'containers/SocketLayout';
import UsersListPage from 'containers/UsersListPage';
import { observer } from 'mobx-react-lite';
import { SnackbarProvider } from 'notistack';
import React, { FC, useEffect } from 'react';
import Routes from 'routes';
import theme from 'theme/theme';
import useKeystone from './keystone';
import { redirectToInitial } from './keystone/service';
import { COLOURS } from './theme/consts';
import { getStoredAccessToken } from './utils/auth';
import { findAppInitialData } from './utils/common';

const useStyles = makeStyles(
  {
    container: {
      width: '100%',
      height: '100%',
      background: COLOURS.MAIN_BG,
      overflow: 'auto',
      position: 'relative',
      minHeight: 400,
      display: 'flex',
      flexDirection: 'column',
    },
    snackbar: {
      maxWidth: 310,
    },
  },
  { name: 'Chat' },
);

export interface IChatProps {
  apiToken?: string;
  channelId?: string;
  userToken?: string;
}

export const Chat: FC<IChatProps> = observer((props) => {
  const { apiToken, channelId, userToken } = props;
  const classes = useStyles();
  const root = useKeystone();

  const generateClassName = createGenerateClassName({
    productionPrefix: 'vlprojects-chat',
  });

  useEffect(() => {
    const { apiTokenFromAttr, channelIdFromAttr } = findAppInitialData();
    root.auth.setApiToken(apiTokenFromAttr || apiToken || '');
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
        <div className={classes.container}>
          <SnackbarProvider dense classes={{ root: classes.snackbar }}>
            <AuthLayout>
              <SocketLayout>
                <Router route={Routes.Profile}>
                  <Profile />
                </Router>
                <Router route={`${Routes.Users}/:id`}>
                  <UsersListPage />
                </Router>
                <Router route={Routes.Users}>
                  <UsersListPage />
                </Router>
                <Router route={Routes.Channels}>
                  <Channels channelTabType={Routes.Channels} />
                </Router>
                <Router route={Routes.Direct}>
                  <Channels channelTabType={Routes.Direct} />
                </Router>
                <Router route={`${Routes.Channels}/:id`}>
                  <ChannelPage />
                </Router>
              </SocketLayout>
            </AuthLayout>
          </SnackbarProvider>
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
});
