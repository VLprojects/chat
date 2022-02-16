import React, { FC } from 'react';
import Channel from '../../../../keystone/chat/channel';
import Poll from '../../../../keystone/chat/poll';
import { doVote } from '../../services';
import CheckboxGroup from '../CheckboxGroup';
import RadioGroup from '../RadioGroup';
import Textarea from '../Textarea';

interface IProps {
  poll: Poll;
  channel: Channel;
}

const PollVariant: FC<IProps> = (props) => {
  const { poll, channel } = props;

  const voteHandler = async (payload: string[]) => {
    const responseOptions = await doVote(poll, payload);
    channel.setPollVoted(payload, responseOptions);
  };

  const renderVariant = (poll: Poll) => {
    if (poll.isOpenEnded) {
      return <Textarea voteHandler={voteHandler} />;
    }

    if (poll.withAnswer) {
      return <RadioGroup poll={poll} voteHandler={voteHandler} />;
    } else {
      return <CheckboxGroup poll={poll} voteHandler={voteHandler} />;
    }
  };

  return renderVariant(poll);
};

export default PollVariant;
