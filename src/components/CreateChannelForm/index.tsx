import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useState } from 'react';
import { Button, FormErrorMessage, Input } from 'ui-kit';
import useStyles from './styles';

interface ICreateChannelForm {
  onClose: () => void;
}

const CreateChannelForm: FC<ICreateChannelForm> = observer((props) => {
  const { onClose } = props;
  const classes = useStyles();

  const [channelName, setChannelName] = useState('');

  const onCreateChannel = useCallback(() => {}, [channelName, setChannelName]);

  return (
    <div className={classes.createChannelForm}>
      <div className={classes.wrapper}>
        <button type="button" className={classes.closeButton} onClick={onClose}>
          ✕
        </button>
        <div>
          <h2>New channel</h2>
          <div className={classes.field}>
            <Input fullWidth placeholder="Channel name" onChange={setChannelName} value={channelName} />
          </div>
          <FormErrorMessage message="" />
          <div>
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
