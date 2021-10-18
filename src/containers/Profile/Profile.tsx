import Typography from '@material-ui/core/Typography';
import SubHeader from 'components/SubHeader';
import { FormattedMessage, useIntl } from 'react-intl';
import useKeystone from 'keystone';
import { saveProfile } from 'keystone/service';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Button, Input } from 'ui-kit';
import { getErrorMessage } from '../../utils/errors';
import useStyles from './styles';

const Profile = observer(() => {
  const intl = useIntl();
  const classes = useStyles();
  const { auth, ui } = useKeystone();
  const root = useKeystone();
  const { enqueueSnackbar } = useSnackbar();

  const [displayName, setDisplayName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    setDisplayName(auth.me.displayName);
    setAvatar(auth.me.avatarUrl);
  }, [auth.me]);

  const onSaveProfile = async () => {
    try {
      await saveProfile(root, displayName, avatar);
      ui.back();
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error as Error));
    }
  };

  return (
    <>
      <SubHeader onBack={() => ui.back()}>
        <Typography variant="h4" color="textPrimary">
          <FormattedMessage id="profile" />
        </Typography>
      </SubHeader>
      <div className={classes.container}>
        <div className={classes.field}>
          <label htmlFor="username">
            <FormattedMessage id="username" />:
          </label>
          <Input
            id="username"
            fullWidth
            variant="outlined"
            size="large"
            placeholder={intl.formatMessage({ id: 'username' })}
            value={displayName}
            onChange={setDisplayName}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor="avatar">
            <FormattedMessage id="avatar" />:
          </label>
          <Input
            id="avatar"
            fullWidth
            variant="outlined"
            size="large"
            placeholder={intl.formatMessage({ id: 'avatarUrl' })}
            value={avatar}
            onChange={setAvatar}
          />
        </div>

        <Button fullWidth size="large" variant="submit" onClick={onSaveProfile}>
          <FormattedMessage id="save" />
        </Button>
      </div>
    </>
  );
});

export default Profile;
