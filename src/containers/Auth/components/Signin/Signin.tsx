import { Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import React, { FC, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Input } from 'ui-kit';
import useKeystone from '../../../../keystone';
import { login } from '../../../../keystone/service';
import { getErrorMessage } from '../../../../utils/errors';
import { AUTH_PASSWORD_MIN_LENGTH, AUTH_USERNAME_MIN_LENGTH } from '../../const';
import useStyles from './styles';

interface ISigninProps {
  onClickSignUp: () => void;
}

const Signin: FC<ISigninProps> = observer((props) => {
  const intl = useIntl();
  const { onClickSignUp } = props;

  const classes = useStyles();
  const root = useKeystone();
  const { enqueueSnackbar } = useSnackbar();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    if (username.length > 0) {
      try {
        await login(root, username, password);
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error));
      }
    }
  };

  const isFilledForm = useMemo(
    () => username.length >= AUTH_USERNAME_MIN_LENGTH && password.length >= AUTH_PASSWORD_MIN_LENGTH,
    [username, password],
  );

  return (
    <>
      <div className={classes.container}>
        <Typography variant="h2">
          <FormattedMessage id="signInTheChat" />
        </Typography>
        <Typography
          variant="h4"
          fontWeight={500}
          fontFamily="PTRootUIWebMedium"
          component="div"
          className={classes.formLabel}
        >
          <span>
            <FormattedMessage id="dontHaveAccount" />
          </span>
          <a href="#" onClick={onClickSignUp}>
            <FormattedMessage id="signUp" />
          </a>
        </Typography>
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
          <Button disabled={!isFilledForm} variant="primary" fullWidth size="large" onClick={onLogin}>
            <FormattedMessage id="enterTheChat" />
          </Button>
        </div>
      </div>
    </>
  );
});

export default Signin;
