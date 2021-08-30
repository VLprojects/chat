import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { COLOURS } from './theme/consts';
import { Router } from './components/Router';
import AuthLayout from './containers/AuthLayout';
import ChannelPage from './containers/ChannelPage';
import Channels from './containers/Channels';
import Profile from './containers/Profile';
import SocketLayout from './containers/SocketLayout';
import UsersListPage from './containers/UsersListPage';
import Routes from './routes';

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

const App: FC = (() => {
  const classes = useStyles();

  return (
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
  );
});

export default App;
