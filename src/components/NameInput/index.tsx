import React, { FC, useState } from 'react';
import { Button, Input } from 'ui-kit';
import useStyles from './styles';

interface NameInputProps {
  onSubmitName: (name: string) => void;
}

const NameInput: FC<NameInputProps> = ({ onSubmitName }) => {
  const [showNameInput, setShowNameInput] = useState(false);
  const [name, setName] = useState('');
  const classes = useStyles();

  if (!showNameInput) {
    return (
      <Button fullWidth onClick={() => setShowNameInput(true)}>
        Login as guest
      </Button>
    );
  }

  return (
    <div style={{ display: 'flex' }}>
      <Input className={classes.input} placeholder="Enter your name" onChange={setName} />
      <Button disabled={name === ''} onClick={() => onSubmitName(name)}>
        Enter
      </Button>
    </div>
  );
};

export default NameInput;
