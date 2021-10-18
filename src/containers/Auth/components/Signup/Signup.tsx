import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { FC, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Input } from 'ui-kit';
import { useSnackbar } from 'notistack';
import { getErrorMessage } from 'utils/errors';
import { signup } from '../../../../keystone/service';
import useKeystone from '../../../../keystone';
import useStyles from './styles';
import { AUTH_PASSWORD_MIN_LENGTH, AUTH_USERNAME_MIN_LENGTH } from '../../const';

interface ISignupProps {
  onClickSignIn: () => void;
}

const Signup: FC<ISignupProps> = observer((props) => {
  const intl = useIntl();
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
    <div className={classes.container}>
      <Typography variant="h1" classes={{ root: classes.header }}>
        <FormattedMessage id="signUp" />
        <br /> <FormattedMessage id="inTheChat" />
      </Typography>
      <div className={classes.formLabel}>
        <span>
          <FormattedMessage id="alreadyHaveAccount" />{' '}
        </span>
        <a href="#" onClick={onClickSignIn}>
          <FormattedMessage id="signIn" />
        </a>
      </div>
      <div className={classes.field}>
        <div className={classes.fieldLabel}>
          <FormattedMessage id="name" />
        </div>
        <Input
          id="username"
          type="text"
          size="large"
          variant="outlined"
          fullWidth
          placeholder={intl.formatMessage({ id: 'enterYourName' })}
          onChange={setUsername}
          value={username}
        />
      </div>
      <div className={classes.field}>
        <div className={classes.fieldLabel}>
          <FormattedMessage id="password" />
        </div>
        <Input
          id="password"
          size="large"
          variant="outlined"
          fullWidth
          type="password"
          placeholder={intl.formatMessage({ id: 'enterPassword' })}
          onChange={setPassword}
          value={password}
        />
      </div>
      <div className={classes.footer}>
        <Button disabled={!isFilledForm} variant="submit" fullWidth size="large" onClick={onSignup}>
          <FormattedMessage id="createAccount" />
        </Button>
      </div>
    </div>
  );
});

export default Signup;
