import { Typography } from '@mui/material';
import SubHeader from 'components/SubHeader';
import useKeystone from 'keystone';
import { saveProfile } from 'keystone/service';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Input } from 'ui-kit';
import HeaderTitle from 'ui-kit/HeaderTitle';
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
        <HeaderTitle>
          <FormattedMessage id="profile" />
        </HeaderTitle>
      </SubHeader>
      <div className={classes.container}>
        <Typography component="label" htmlFor="username" variant="body2" fontFamily="PTRootUIWebBold">
          <FormattedMessage id="username" />
        </Typography>
        <Input
          id="username"
          fullWidth
          variant="outlined"
          size="large"
          placeholder={intl.formatMessage({ id: 'username' })}
          value={displayName}
          onChange={setDisplayName}
        />

        <Typography component="label" htmlFor="avatar" variant="body2" marginTop="20px" fontFamily="PTRootUIWebBold">
          <FormattedMessage id="avatar" />
        </Typography>
        <Input
          id="avatar"
          fullWidth
          variant="outlined"
          size="large"
          placeholder={intl.formatMessage({ id: 'avatarUrl' })}
          value={avatar}
          onChange={setAvatar}
        />

        <Button fullWidth size="large" variant="primary" onClick={onSaveProfile} style={{ marginTop: 'auto' }}>
          <FormattedMessage id="save" />
        </Button>
      </div>
    </>
  );
});

export default Profile;
