import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { reaction } from 'mobx';
import { Button, FormErrorMessage, Input } from 'ui-kit';
import { usernameGenerator } from '../../utils/users';
import Routes from '../../routes';
import useKeystone from '../../keystone';
import { login, signup, redirectToInitial } from '../../keystone/service';
import useStyles from './styles';

const Login = observer(() => {
  const classes = useStyles();
  const root = useKeystone();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (username.length > 0) {
      login(root, username, password);
    }
  };

  const onSignup = () => root.ui.setRoute(Routes.Signup);

  const onGuestEnter = () => {
    const generatedUsername = usernameGenerator();
    signup(root, generatedUsername);
  };

  useEffect(() =>
    reaction(
      () => root.auth.isAuthorized,
      (isAuthorized) => {
        if (isAuthorized) {
          redirectToInitial(root);
        }
      },
    ),
  );

  return (
    <>
      <div className={classes.container}>
        <Typography variant="h1" classes={{ root: classes.header }}>
          Enter
          <br /> the chat
        </Typography>
        <div className={classes.field}>
          <div className={classes.fieldLabel}>Name</div>
          <Input
            size="large"
            variant="outlined"
            fullWidth
            placeholder="Enter your name"
            onChange={setUsername}
            value={username}
          />
        </div>
        <div className={classes.field}>
          <div className={classes.fieldLabel}>Password</div>
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
        <FormErrorMessage message={root.ui.authError} />
        <div className={classes.footer}>
          <Button variant="submit" fullWidth size="large" onClick={onLogin}>
            Sign In
          </Button>

          <Button variant="outlined" fullWidth size="large" onClick={onGuestEnter}>
            Log in as a guest
          </Button>
          <div>
            <span className={classes.fontRegular14LineHeight18}>Don&apos;t have an account ? </span>
            <a href="#" onClick={onSignup} className={classes.fontRegular14LineHeight18}>
              Sign up
            </a>
          </div>
        </div>
      </div>
    </>
  );
});

export default Login;
