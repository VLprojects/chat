import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import Poll from '../../../../keystone/chat/poll';
import { Button } from '../../../../ui-kit';

interface IProps {
  poll: Poll;
  voteHandler: (payload: string[]) => void;
}
const RadioButtonsGroup: FC<IProps> = (props) => {
  const { poll, voteHandler } = props;
  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <FormControl style={{ flexGrow: 1 }}>
        <RadioGroup value={value} onChange={handleChange} name="test">
          <>
            {poll.options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={`${option.id}`}
                control={<Radio />}
                label={option.option}
                sx={{ wordBreak: 'break-all' }}
              />
            ))}
          </>
        </RadioGroup>
      </FormControl>

      <Button variant="submit" fullWidth disabled={!value} onClick={() => voteHandler([value])}>
        <FormattedMessage id="reply" />
      </Button>
    </>
  );
};

export default RadioButtonsGroup;
