import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import React, { ChangeEvent, FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Poll from '../../../../keystone/chat/poll';
import { Button } from '../../../../ui-kit';

interface IProps {
  poll: Poll;
  voteHandler: (payload: string[]) => void;
}
const CheckboxGroup: FC<IProps> = (props) => {
  const { poll, voteHandler } = props;
  const [state, setState] = useState<Record<string, boolean>>(
    poll.options.reduce((acc, option) => ({ ...acc, [option.id]: false }), {}),
  );
  const disabled = !Object.values(state).find((value) => value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <FormControl style={{ flexGrow: 1 }}>
        <FormGroup>
          {poll.options.map((option) => (
            <FormControlLabel
              key={option.id}
              control={<Checkbox checked={state[option.id]} onChange={handleChange} name={`${option.id}`} />}
              label={option.option}
              sx={{ wordBreak: 'break-all' }}
            />
          ))}
        </FormGroup>
      </FormControl>
      <Button
        variant="submit"
        fullWidth
        disabled={disabled}
        onClick={() => voteHandler(Object.keys(state).filter((key) => state[key]))}
      >
        <FormattedMessage id="reply" />
      </Button>
    </>
  );
};

export default CheckboxGroup;
