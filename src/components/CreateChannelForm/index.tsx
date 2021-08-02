import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect, useState } from 'react';
import useStores from 'stores/rootStore';
import { Button, FormErrorMessage, Input } from 'ui-kit';
import styles from './CreateChannelForm.module.scss';

interface ICreateChannelForm {
  onClose: () => void;
}

const CreateChannelForm: FC<ICreateChannelForm> = observer((props) => {
  const { onClose } = props;

  const { channelsStore } = useStores();
  const [channelName, setChannelName] = useState('');

  const onCreateChannel = useCallback(() => {
    if (channelName.length > 0) {
      channelsStore.createChannel(channelName);
    }
  }, [channelName, setChannelName]);

  useEffect(() => {
    if (channelsStore.isChannelCreated) {
      channelsStore.clearChannelCreated();
      onClose();
    }
  }, [channelsStore.isChannelCreated]);

  return (
    <div className={styles.createChannelForm}>
      <div className={styles.wrapper}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <div className={styles.container}>
          <h2>New channel</h2>
          <div className={styles.field}>
            <Input fullWidth placeholder="Channel name" onChange={setChannelName} value={channelName} />
          </div>
          <FormErrorMessage message={channelsStore.channelCreatedError} />
          <div className={styles.submit}>
            <Button fullWidth variant="submit" onClick={onCreateChannel}>
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CreateChannelForm;
