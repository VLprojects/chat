import { Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import React, { FC, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Input } from 'ui-kit';
import { getErrorMessage } from 'utils/errors';
import useKeystone from '../../../../keystone';
import { signup } from '../../../../keystone/service';
import { AUTH_PASSWORD_MIN_LENGTH, AUTH_USERNAME_MIN_LENGTH } from '../../const';
import useStyles from './styles';

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
      <Typography variant="h2">
        <FormattedMessage id="signUpinTheChat" />
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
        <Typography variant="body2" className={classes.fieldLabel}>
          <FormattedMessage id="name" />
        </Typography>
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
        <Typography variant="body2" className={classes.fieldLabel}>
          <FormattedMessage id="password" />
        </Typography>
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
        <Button disabled={!isFilledForm} variant="active" fullWidth size="large" onClick={onSignup}>
          <FormattedMessage id="createAccount" />
        </Button>
      </div>
    </div>
  );
});

export default Signup;
