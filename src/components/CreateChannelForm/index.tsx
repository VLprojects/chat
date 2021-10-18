import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Input } from 'ui-kit';
import useStyles from './styles';

interface ICreateChannelForm {
  onClose: () => void;
}

const CreateChannelForm: FC<ICreateChannelForm> = observer((props) => {
  const { onClose } = props;
  const classes = useStyles();
  const intl = useIntl();

  const [channelName, setChannelName] = useState('');

  const onCreateChannel = useCallback(() => {}, [channelName, setChannelName]);

  return (
    <div className={classes.createChannelForm}>
      <div className={classes.wrapper}>
        <button type="button" className={classes.closeButton} onClick={onClose}>
          ✕
        </button>
        <div>
          <h2>
            <FormattedMessage id="newChannel" />
          </h2>
          <div className={classes.field}>
            <Input
              fullWidth
              placeholder={intl.formatMessage({ id: 'channelName' })}
              onChange={setChannelName}
              value={channelName}
            />
          </div>
          <div>
            <Button fullWidth variant="submit" onClick={onCreateChannel}>
              <FormattedMessage id="create" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CreateChannelForm;
