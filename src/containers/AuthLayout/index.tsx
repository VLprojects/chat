import LinearProgress from '@material-ui/core/LinearProgress';
import { Router } from 'components/Router';
import Login from 'containers/Login';
import Signup from 'containers/Signup';
import useKeystone from 'keystone';
import { signup, redirectToInitial } from 'keystone/service';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import Routes from 'routes';
import { usernameGenerator } from 'utils/users';

interface Props {
  children: JSX.Element;
}

const AuthLayout = observer(({ children }: Props): JSX.Element => {
  const root = useKeystone();

  useEffect(
    () =>
      autorun(async () => {
        if (!root.auth.isAuthorized) {
          if (root.auth.isAnonymousAllowed) {
            const generatedUsername = usernameGenerator();
            await signup(root, generatedUsername);
            redirectToInitial(root);
          } else {
            root.ui.setRoute(Routes.Login);
          }
        }
      }),
    [],
  );

  if (root.auth.isAuthorized) {
    return children;
  }

  if (root.auth.isAnonymousAllowed) {
    return <LinearProgress />;
  }

  return (
    <>
      <Router route={Routes.Login}>
        <Login />
      </Router>
      <Router route={Routes.Signup}>
        <Signup />
      </Router>
    </>
  );
});

export default AuthLayout;
