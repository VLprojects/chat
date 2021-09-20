import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { FC, useMemo, useState } from 'react';
import { Button, Input } from 'ui-kit';
import { useSnackbar } from 'notistack';
import { getErrorMessage } from 'utils/errors';
import { signup } from 'keystone/service';
import useKeystone from '../../../../keystone';
import useStyles from './styles';
import { AUTH_PASSWORD_MIN_LENGTH, AUTH_USERNAME_MIN_LENGTH } from '../../const';

interface ISignupProps {
  onClickSignIn: () => void;
}

const Signup: FC<ISignupProps> = observer((props) => {
  const { onClickSignIn } = props;

  const classes = useStyles();
  const root = useKeystone();
  const { enqueueSnackbar } = useSnackbar();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isFilledForm = useMemo(
    () => username.length >= AUTH_USERNAME_MIN_LENGTH && password.length >= AUTH_PASSWORD_MIN_LENGTH,
    [username, password],
  );

  const onSignup = async () => {
    if (isFilledForm) {
      try {
        await signup(root, username, password);
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error));
      }
    }
  };

  return (
    <>
      <div className={classes.container}>
        <Typography variant="h1" classes={{ root: classes.header }}>
          Sign up
          <br /> in the chat
        </Typography>
        <div className={classes.formLabel}>
          <span>Already have an account? </span>
          <a href="#" onClick={onClickSignIn}>
            Sign in
          </a>
        </div>
        <div className={classes.field}>
          <div className={classes.fieldLabel}>Name</div>
          <Input
            id="username"
            type="text"
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
            id="password"
            size="large"
            variant="outlined"
            fullWidth
            type="password"
            placeholder="Enter password"
            onChange={setPassword}
            value={password}
          />
        </div>
        <div className={classes.footer}>
          <Button disabled={!isFilledForm} variant="submit" fullWidth size="large" onClick={onSignup}>
            Create account
          </Button>
        </div>
      </div>
    </>
  );
});

export default Signup;
