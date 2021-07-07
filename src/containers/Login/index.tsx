import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
// import UsernameGenerator from 'username-generator';

import { Button, FormErrorMessage, Input } from 'ui-kit';

import { usernameGenerator } from 'utils/users';

import Routes from 'routes';
import useStores from 'stores/root';
import styles from './Login.module.scss';

const Login = observer(() => {
  const history = useHistory();

  const { authStore } = useStores();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (username.length > 0) {
      authStore.login(username, password);
    }
  };

  const onGuestEnter = () => {
    const generatedUsername = usernameGenerator();

    authStore.signup(generatedUsername);
  };

  useEffect(() => {
    if (authStore.isAuthorized) {
      history.push(`/${Routes.Channels}`);
    }
  }, [authStore.isAuthorized]);

  return (
    <>
      <div className={styles.container}>
        <h2>Chat login</h2>
        <div className={styles.field}>
          <Input
            size="large"
            variant="outlined"
            fullWidth
            placeholder="User name"
            onChange={setUsername}
            value={username}
          />
        </div>
        <div className={styles.field}>
          <Input
            size="large"
            variant="outlined"
            fullWidth
            type="password"
            placeholder="Password"
            onChange={setPassword}
            value={password}
          />
        </div>
        <FormErrorMessage message={authStore.authError} />
        <div className={styles.submit}>
          <Button variant="submit" fullWidth size="large" onClick={onLogin}>
            Let&lsquo;s go
          </Button>
        </div>
        <div className={styles.footer}>
          <Button onClick={() => history.push(`/${Routes.Signup}`)}>Sign Up</Button>
          <Button onClick={onGuestEnter}>Guest</Button>
        </div>
      </div>
    </>
  );
});

export default Login;
