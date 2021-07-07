import React, { FC, useState } from 'react';

import { Flex, Button, Input } from 'ui-kit';

import styles from './NameInput.module.scss';

interface NameInputProps {
  onSubmitName: (name: string) => void;
}

const NameInput: FC<NameInputProps> = ({ onSubmitName }) => {
  const [showNameInput, setShowNameInput] = useState(false);
  const [name, setName] = useState('');

  if (!showNameInput) {
    return (
      <Button fullWidth onClick={() => setShowNameInput(true)}>Login as guest</Button>
    );
  }

  return (
    <Flex row>
      <Input
        className={styles.input}
        placeholder="Enter your name"
        onChange={setName}
      />
      <Button disabled={name === ''} onClick={() => onSubmitName(name)}>Enter</Button>
    </Flex>
  );
};

export default NameInput;
