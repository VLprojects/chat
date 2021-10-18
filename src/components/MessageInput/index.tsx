import { Grid } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { Button } from 'ui-kit';
import { FormattedMessage, useIntl } from 'react-intl';
import useKeystone from '../../keystone';
import { sendMessage } from '../../keystone/service';
import { getErrorMessage } from '../../utils/errors';

interface IMessageInput {
  channelId: string;
}

const MessageInput: FC<IMessageInput> = (props) => {
  const intl = useIntl();
  const { channelId } = props;
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const root = useKeystone();
  const { enqueueSnackbar } = useSnackbar();

  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const onMessageSubmit = async () => {
    if (message.length) {
      try {
        setLoading(true);
        await sendMessage(root, channelId, message);
        setMessage('');
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error as Error));
      } finally {
        setLoading(false);
      }
    }
  };
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      onMessageSubmit();
    }
  };
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs>
          <TextareaAutosize
            onKeyDown={onKeyDown}
            aria-label="empty textarea"
            placeholder={intl.formatMessage({ id: 'messageInputPlaceholder' })}
            value={message}
            maxRows={5}
            onChange={onInputChange}
            disabled={loading}
            data-qa="input-message"
          />
        </Grid>
        <Grid item>
          <Button variant="submit" data-qa="send-button" onClick={onMessageSubmit} disabled={loading}>
            <FormattedMessage id="send" />
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default observer(MessageInput);
