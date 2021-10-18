import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { FC, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Input } from 'ui-kit';
import { useSnackbar } from 'notistack';
import { getErrorMessage } from '../../../../utils/errors';
import useKeystone from '../../../../keystone';
import { signup } from '../../../../keystone/service';
import useStyles from './styles';
import { usernameGenerator } from '../../../../utils/users';

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
        <Typography variant="h1" classes={{ root: classes.header }}>
          <FormattedMessage id="login" />
          <br /> <FormattedMessage id="asGuest" />
        </Typography>

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

        <div className={classes.footer}>
          <Button variant="submit" fullWidth size="large" onClick={onGuestEnter}>
            <FormattedMessage id="enterTheChat" />
          </Button>
        </div>
      </div>
    </>
  );
});

export default Guest;
