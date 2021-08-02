import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import Routes from 'routes';
import useStores from 'stores/rootStore';
import { Button, FormErrorMessage, Input } from 'ui-kit';
import { usernameGenerator } from 'utils/users';
import styles from './Login.module.scss';

const Login = observer(() => {
  const { authStore, chatStore } = useStores();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (username.length > 0) {
      authStore.login(username, password);
    }
  };

  const onSignup = () => chatStore.setRoute(Routes.Signup);

  const onGuestEnter = () => {
    const generatedUsername = usernameGenerator();
    authStore.signup(generatedUsername);
  };

  useEffect(() => {
    if (authStore.isAuthorized) {
      chatStore.setRoute(Routes.Channels);
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
          <Button onClick={onSignup}>Signup</Button>
          <Button onClick={onGuestEnter}>Guest</Button>
        </div>
      </div>
    </>
  );
});

export default Login;
