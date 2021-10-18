import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { FC, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Input } from 'ui-kit';
import { useSnackbar } from 'notistack';
import { getErrorMessage } from '../../../../utils/errors';
import useKeystone from '../../../../keystone';
import { login } from '../../../../keystone/service';
import useStyles from './styles';
import { AUTH_PASSWORD_MIN_LENGTH, AUTH_USERNAME_MIN_LENGTH } from '../../const';
import Routes from '../../../../routes';

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
        <Typography variant="h1" classes={{ root: classes.header }}>
          <FormattedMessage id="signIn" />
          <br /> <FormattedMessage id="theChat" />
        </Typography>
        <div className={classes.formLabel}>
          <span>
            <FormattedMessage id="dontHaveAccount" />
          </span>
          <a href="#" onClick={onClickSignUp}>
            <FormattedMessage id="signUp" />
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
            placeholder={intl.formatMessage({ id: 'enterYourName' })}
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
            placeholder={intl.formatMessage({ id: 'enterPassword' })}
            onChange={setPassword}
            value={password}
          />
        </div>
        <div className={classes.footer}>
          <Button disabled={!isFilledForm} variant="submit" fullWidth size="large" onClick={onLogin}>
            <FormattedMessage id="enterTheChat" />
          </Button>

          <div>
            <span className={classes.fontRegular14LineHeight18}>
              <FormattedMessage id="dontHaveAccount" />
            </span>
            <a href="#" onClick={() => root.ui.setRoute(Routes.Signup)} className={classes.fontRegular14LineHeight18}>
              <FormattedMessage id="signUp" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
});

export default Signin;
