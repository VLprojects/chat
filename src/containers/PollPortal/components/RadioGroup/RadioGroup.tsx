import { Grid } from '@mui/material';
import React, { FC } from 'react';
import Poll from '../../../../keystone/chat/poll';
import OptionBox from '../OptionBox';

interface IProps {
  poll: Poll;
  voteHandler: (payload: string[]) => void;
}
const RadioButtonsGroup: FC<IProps> = (props) => {
  const { poll, voteHandler } = props;

  const handleChange = (id: string) => () => {
    voteHandler([id]);
  };

  return (
    <>
      <Grid container direction="column" rowGap={2}>
        {poll.options.map((option) => (
          <OptionBox
            key={option.id}
            dataQA={`poll-pick-${option.option}`}
            onChange={handleChange(`${option.id}`)}
            option={option}
          />
        ))}
      </Grid>
    </>
  );
};

export default RadioButtonsGroup;
