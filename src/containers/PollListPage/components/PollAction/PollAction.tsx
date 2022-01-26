import { AxiosError } from 'axios';
import { autorun } from 'mobx';
import React, { FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { IPollStatus } from 'types/types';
import { Button } from 'ui-kit';
import useKeystone from '../../../../keystone';
import Poll from '../../../../keystone/chat/poll';
import Routes from '../../../../routes';
import { startPoll, stopPoll } from '../../services';

interface IProps {
  poll: Poll;
}
const PollAction: FC<IProps> = (props) => {
  const { poll } = props;
  const [pollStatus, setPollStatus] = useState(poll.status);
  const root = useKeystone();
  const { ui, chat } = root;

  autorun(() => {
    if (pollStatus !== poll.status) {
      setPollStatus(poll.status);
    }
  });

  const channelId = String(ui.params.id);

  const currentChannel = chat.channels.get(channelId);
  if (!currentChannel) {
    return null;
  }

  const onPollStart = async () => {
    try {
      const response = await startPoll(+poll.id);
      poll.status = response.status;
      currentChannel.startPoll(poll);
    } catch (e) {
      // show error
    }
  };

  const onPollEnd = async () => {
    try {
      await stopPoll(+poll.id);
      currentChannel.stopPoll(poll);
    } catch (e) {
      const err = e as AxiosError;
      switch (err?.response?.status) {
        case 409:
          currentChannel.stopPoll(poll);
          break;
        default:
          ui.setRoute(`/${Routes.Polls}`);
          break;
      }
    }
  };

  const onPollResult = () => {
    currentChannel.pollResult(poll);
  };

  switch (pollStatus) {
    case IPollStatus.New:
      return (
        <Button variant="submit" onClick={onPollStart} data-qa="startPoll">
          <FormattedMessage id="startPoll" />
        </Button>
      );
    case IPollStatus.InProgress:
      return (
        <Button variant="submit" onClick={onPollEnd} data-qa="completePoll">
          <FormattedMessage id="completePoll" />
        </Button>
      );
    case IPollStatus.Done:
      return (
        <Button variant="submit" onClick={onPollResult} data-qa="seeResults">
          <FormattedMessage id="seeResults" />
        </Button>
      );
    default:
      return null;
  }
};

export default PollAction;
