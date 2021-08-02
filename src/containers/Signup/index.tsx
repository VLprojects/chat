import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import Routes from 'routes';
import useStores from 'stores/rootStore';
import { Button, FormErrorMessage, Input } from 'ui-kit';
import styles from './Signup.module.scss';

const Signup = observer(() => {
  const { authStore, chatStore } = useStores();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (username.length > 0) {
      authStore.signup(username, password);
    }
  };

  useEffect(() => {
    if (authStore.isAuthorized) {
      chatStore.setRoute(Routes.Channels);
    }
  }, [authStore.isAuthorized]);

  return (
    <>
      <div className={styles.container}>
        <h2>Chat registration</h2>
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
            Create account
          </Button>
        </div>
        <div className={styles.footer}>
          <Button onClick={() => chatStore.setRoute(Routes.Login)}>Login</Button>
        </div>
      </div>
    </>
  );
});

export default Signup;
