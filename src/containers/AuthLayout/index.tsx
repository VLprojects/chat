import { Router } from 'components/Router';
import Login from 'containers/Login';
import Signup from 'containers/Signup';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import Routes from 'routes';
import useStores from 'stores/rootStore';
import { WineLoader } from 'ui-kit';
import { usernameGenerator } from 'utils/users';

interface Props {
  children: JSX.Element;
}

const AuthLayout = observer(({ children }: Props): JSX.Element => {
  const { authStore, chatStore } = useStores();

  useEffect(
    () =>
      autorun(() => {
        if (!authStore.isAuthorized) {
          if (chatStore.isAnonymousAllowed) {
            const generatedUsername = usernameGenerator();
            authStore.signup(generatedUsername);
          } else {
            chatStore.setRoute(Routes.Login);
          }
        }
      }),
    [],
  );

  if (authStore.isAuthorized) {
    return children;
  }

  if (chatStore.isAnonymousAllowed) {
    return <WineLoader />;
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
