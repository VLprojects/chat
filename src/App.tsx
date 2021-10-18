import { makeStyles } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import React, { FC, useEffect } from 'react';
import { Router } from './components/Router';
import AuthLayout from './containers/AuthLayout';
import ChannelPage from './containers/ChannelPage';
import Channels from './containers/Channels';
import CreatePollPage from './containers/CreatePollPage';
import PollListPage from './containers/PollListPage';
import Profile from './containers/Profile';
import SocketLayout from './containers/SocketLayout';
import UsersListPage from './containers/UsersListPage';
import Routes from './routes';
import { COLOURS } from './theme/consts';
import { POLL_CONTAINER } from './types/const';

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

const getPortalElement = () => {
  const el = document.createElement('div');
  el.id = POLL_CONTAINER;

  return el;
};

const App: FC = () => {
  const classes = useStyles();

  useEffect(() => {
    document.body.appendChild(getPortalElement());
  }, []);

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
            <Router route={`${Routes.Polls}/:id`}>
              <PollListPage />
            </Router>
            <Router route={`${Routes.CreatePoll}/:id`}>
              <CreatePollPage />
            </Router>
          </SocketLayout>
        </AuthLayout>
      </SnackbarProvider>
    </div>
  );
};

export default App;
