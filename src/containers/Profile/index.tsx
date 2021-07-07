import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import ChatHeader from 'components/Header';
import { Input, Button } from 'ui-kit';

import useStores from 'stores/root';

import styles from './Profile.module.scss';

const Profile = observer(() => {
  const { profileStore } = useStores();

  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    profileStore.clearError();
  }, []);

  useEffect(() => {
    setUsername(profileStore.user?.username || '');
    setAvatar(profileStore.user?.avatarUrl || '');
  }, [profileStore.user]);

  const onSaveProfile = () => {
    profileStore.saveProfile(username, avatar);
  };

  return (
    <>
      <ChatHeader title="Profile" />
      <div className={styles.container}>
        <div className={styles.field}>
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
        <div className={styles.field}>
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
        {profileStore.profileError && (
          <div className={styles.error}>{profileStore.profileError}</div>
        )}
        <div className={styles.submit}>
          <Button
            fullWidth
            size="large"
            variant="submit"
            onClick={onSaveProfile}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
});

export default Profile;
