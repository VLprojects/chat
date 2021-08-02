import commonStyles from 'Chat.module.scss';
import cls from 'classnames';
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
        <h1 className={styles.header}>
          Enter
          <br /> the chat
        </h1>
        <div className={styles.field}>
          <div className={cls(commonStyles.regular14, styles.fieldLabel)}>Name</div>
          <Input
            size="large"
            variant="outlined"
            fullWidth
            placeholder="Enter your name"
            onChange={setUsername}
            value={username}
          />
        </div>
        <div className={styles.field}>
          <div className={cls(commonStyles.regular14, styles.fieldLabel)}>Password</div>
          <Input
            size="large"
            variant="outlined"
            fullWidth
            type="password"
            placeholder="Enter password"
            onChange={setPassword}
            value={password}
          />
        </div>
        <FormErrorMessage message={authStore.authError} />
        <div className={styles.footer}>
          <Button variant="submit" fullWidth size="large" onClick={onLogin}>
            Sign In
          </Button>

          <Button variant="outlined" fullWidth size="large" onClick={onGuestEnter}>
            Log in as a guest
          </Button>
          <div>
            <span className={cls(commonStyles.regular14)}>Don&apos;t have an account ? </span>
            <a href="#" onClick={onSignup}>
              Sign up
            </a>
          </div>
        </div>
      </div>
    </>
  );
});

export default Login;
