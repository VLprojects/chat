import { Grid } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { Button } from 'ui-kit';
import { useSnackbar } from 'notistack';
import { getErrorMessage } from '../../utils/errors';
import useKeystone from '../../keystone';
import { sendMessage } from '../../keystone/service';
import useStyles from './styles';

interface IMessageInput {
  channelId: string;
}

const MessageInput: FC<IMessageInput> = (props) => {
  const { channelId } = props;
  const classes = useStyles();
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
        enqueueSnackbar(getErrorMessage(error));
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
            className={classes.input}
          />
        </Grid>
        <Grid item>
          <Button variant="submit" onClick={onMessageSubmit} className={classes.sendButton}>
            Send
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default observer(MessageInput);
