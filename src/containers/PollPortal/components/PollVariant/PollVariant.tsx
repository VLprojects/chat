import React, { FC } from 'react';
import Channel from '../../../../keystone/chat/channel';
import Poll from '../../../../keystone/chat/poll';
import { doVote } from '../../services';
import CheckboxGroup from '../CheckboxGroup';
import RadioGroup from '../RadioGroup';

interface IProps {
  poll: Poll;
  channel: Channel;
}

const PollVariant: FC<IProps> = (props) => {
  const { poll, channel } = props;

  const voteHandler = (payload: string[]) => {
    doVote(payload);
    channel.setPollVoted(payload);
  };

  return (
    <>
      {poll.withAnswer ? (
        <CheckboxGroup poll={poll} voteHandler={voteHandler} />
      ) : (
        <RadioGroup poll={poll} voteHandler={voteHandler} />
      )}
    </>
  );
};

export default PollVariant;
