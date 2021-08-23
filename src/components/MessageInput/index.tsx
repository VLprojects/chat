import { Grid } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { Button, FormErrorMessage } from 'ui-kit';
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

  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const onMessageSubmit = () => {
    if (message.length) {
      sendMessage(root, channelId, message);
      setMessage('');
    }
  };
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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
      <FormErrorMessage message={root.ui.messageSendError} />
    </>
  );
};

export default observer(MessageInput);
