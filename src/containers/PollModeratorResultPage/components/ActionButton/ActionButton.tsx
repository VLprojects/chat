import Box from '@mui/system/Box';
import { onPollEndHandler, onPollStartHandler } from 'containers/PollListPage/services';
import Channel from 'keystone/chat/channel';
import Poll from 'keystone/chat/poll';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { IPollStatus } from 'types/types';
import Button from 'ui-kit/components/Button';

interface IProps {
  currentChannel?: Channel;
  templatePoll?: Poll;
  activePoll: Poll;
}

const ActionButton: React.FC<IProps> = (props) => {
  const { currentChannel, templatePoll, activePoll } = props;
  const intl = useIntl();

  const onPollStart = () => {
    if (currentChannel?.isPollsInProgress && !confirm(intl.formatMessage({ id: 'anotherPollInProgress' }))) {
      return;
    }

    onPollStartHandler({ channel: currentChannel, templatePoll });
  };

  const onPollEnd = () => {
    onPollEndHandler({
      activePoll,
      channel: currentChannel,
    });
  };

  switch (activePoll.status) {
    case IPollStatus.Done:
      return (
        <Box padding="12px">
          <Button variant="contained" fullWidth data-qa="startPoll" onClick={onPollStart}>
            <FormattedMessage id="startPoll" />
          </Button>
        </Box>
      );

    case IPollStatus.InProgress:
      return (
        <Box padding="12px">
          <Button variant="contained" fullWidth onClick={onPollEnd} data-qa="completePoll">
            <FormattedMessage id="completePoll" />
          </Button>
        </Box>
      );
    default:
      return null;
  }
};

export default ActionButton;
