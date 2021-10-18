import React, { FC, useState } from 'react';
import { Button, Input } from 'ui-kit';
import { FormattedMessage, useIntl } from 'react-intl';
import useStyles from './styles';

interface NameInputProps {
  onSubmitName: (name: string) => void;
}

const NameInput: FC<NameInputProps> = ({ onSubmitName }) => {
  const intl = useIntl();
  const [showNameInput, setShowNameInput] = useState(false);
  const [name, setName] = useState('');
  const classes = useStyles();

  if (!showNameInput) {
    return (
      <Button fullWidth onClick={() => setShowNameInput(true)}>
        <FormattedMessage id="loginAsGuest" />
      </Button>
    );
  }

  return (
    <div style={{ display: 'flex' }}>
      <Input className={classes.input} placeholder={intl.formatMessage({ id: 'enterYourName' })} onChange={setName} />
      <Button disabled={name === ''} onClick={() => onSubmitName(name)}>
        <FormattedMessage id="enter" />
      </Button>
    </div>
  );
};

export default NameInput;
