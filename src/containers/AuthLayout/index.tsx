import { LinearProgress } from '@mui/material';
import Auth from 'containers/Auth';
import useKeystone from 'keystone';
import { signup } from 'keystone/service';
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

  // todo investigate use case of this and write results here
  if (root.auth.isAnonymousAllowed) {
    return (
      <>
        <LinearProgress color="secondary" />
      </>
    )
  }

  return <Auth />;
});

export default AuthLayout;
