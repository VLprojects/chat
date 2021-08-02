import { observer } from 'mobx-react-lite';
import React, { FC, KeyboardEvent, useState } from 'react';
import useStores from 'stores/rootStore';
import { Button, Flex, FormErrorMessage, Input } from 'ui-kit';
import styles from './MessageInput.module.scss';

interface IMessageInput {
  channelId: number;
  type?: 'channel' | 'direct';
}

const MessageInput: FC<IMessageInput> = observer((props) => {
  const { channelId } = props;

  const { messagesStore } = useStores();
  const [message, setMessage] = useState('');

  const onMessageSubmit = () => {
    if (message.length) {
      messagesStore.sendMessage(channelId, message);
      setMessage('');
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === '13') {
      onMessageSubmit();
    }
  };

  return (
    <>
      <Flex row>
        <Input
          className={styles.input}
          placeholder="Message"
          value={message}
          onChange={setMessage}
          onKeyDown={onKeyDown}
        />
        <Button variant="submit" onClick={onMessageSubmit}>
          Send
        </Button>
      </Flex>
      <FormErrorMessage message={messagesStore.messageSendError} />
    </>
  );
});

export default MessageInput;
