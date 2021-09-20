import { Grid } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { Button } from 'ui-kit';
import useKeystone from '../../keystone';
import { sendMessage } from '../../keystone/service';
import { getErrorMessage } from '../../utils/errors';

interface IMessageInput {
  channelId: string;
}

const MessageInput: FC<IMessageInput> = (props) => {
  const { channelId } = props;
  const [message, setMessage] = useState('');
  const root = useKeystone();
  const { enqueueSnackbar } = useSnackbar();

  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const onMessageSubmit = async () => {
    if (message.length) {
      try {
        await sendMessage(root, channelId, message);
        setMessage('');
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error as Error));
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
            placeholder="Enter your message"
            value={message}
            maxRows={10}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item>
          <Button variant="submit" onClick={onMessageSubmit}>
            Send
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default observer(MessageInput);
