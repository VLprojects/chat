import ChatHeader from 'components/Header';
import useKeystone from 'keystone';
import { saveProfile } from 'keystone/service';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Input } from 'ui-kit';
import useStyles from './styles';

const Profile = observer(() => {
  const classes = useStyles();
  const { auth, ui } = useKeystone();
  const root = useKeystone();

  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    ui.setProfileError('');
  }, []);

  useEffect(() => {
    setUsername(auth.me.username);
    setAvatar(auth.me.avatarUrl);
  }, [auth.me]);

  const onSaveProfile = () => {
    saveProfile(root, username, avatar);
  };

  return (
    <>
      <ChatHeader title="Profile" />
      <div className={classes.container}>
        <div className={classes.field}>
          <label htmlFor="username">Username:</label>
          <Input
            id="username"
            fullWidth
            variant="outlined"
            size="large"
            placeholder="User name"
            value={username}
            onChange={setUsername}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor="avatar">Avatar:</label>
          <Input
            id="avatar"
            fullWidth
            variant="outlined"
            size="large"
            placeholder="Avatar url"
            value={avatar}
            onChange={setAvatar}
          />
        </div>
        {ui.profileError && <div className={classes.error}>{ui.profileError}</div>}
        <div>
          <Button fullWidth size="large" variant="submit" onClick={onSaveProfile}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
});

export default Profile;
