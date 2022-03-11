import { Grid } from '@mui/material';
import Poll from 'keystone/chat/poll';
import React, { FC, useState } from 'react';
import OptionBox from '../OptionBox';
import SubmitPollButton from '../SubmitPollButton';

interface IProps {
  poll: Poll;
  voteHandler: (payload: string[]) => void;
}
const CheckboxGroup: FC<IProps> = (props) => {
  const { poll, voteHandler } = props;
  const [checked, setChecked] = useState<Record<string, boolean>>(
    poll.options.reduce((acc, option) => ({ ...acc, [option.id]: false }), {}),
  );
  const disabled = !Object.values(checked).find((value) => value);

  const handleChange = (name: string) => () => {
    setChecked((state) => ({ ...state, [name]: !state[name] }));
  };

  return (
    <>
      <Grid container direction="column" rowGap={2}>
        {poll.options.map((option) => (
          <OptionBox
            key={option.id}
            onChange={handleChange(`${option.id}`)}
            checked={checked[option.id]}
            option={option}
            dataQA={`poll-pick-${option.option}`}
          />
        ))}
      </Grid>

      <SubmitPollButton
        disabled={disabled}
        onSubmit={() => voteHandler(Object.keys(checked).filter((key) => checked[key]))}
        dataQA="submitPollAnswer"
      />
    </>
  );
};

export default CheckboxGroup;
