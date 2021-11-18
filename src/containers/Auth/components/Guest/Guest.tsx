import { Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import React, { FC, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Input } from 'ui-kit';
import useKeystone from '../../../../keystone';
import { signup } from '../../../../keystone/service';
import { getErrorMessage } from '../../../../utils/errors';
import { usernameGenerator } from '../../../../utils/users';
import useStyles from './styles';

const Guest: FC = observer(() => {
  const intl = useIntl();
  const classes = useStyles();
  const root = useKeystone();
  const { enqueueSnackbar } = useSnackbar();

  const [username, setUsername] = useState('');

  const onGuestEnter = async () => {
    let name = username;
    if (!name.length) {
      name = usernameGenerator();
    }

    try {
      await signup(root, name);
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error));
    }
  };

  return (
    <>
      <div className={classes.container}>
        <Typography variant="h2">
          <FormattedMessage id="loginAsGuest" />
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

        <div className={classes.footer}>
          <Button variant="active" fullWidth size="large" onClick={onGuestEnter}>
            <FormattedMessage id="enterTheChat" />
          </Button>
        </div>
      </div>
    </>
  );
});

export default Guest;
