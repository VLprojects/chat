import useKeystone from 'keystone';
import Poll from 'keystone/chat/poll';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import Routes from 'routes';
import { IPollStatus } from 'types/types';
import { Button } from 'ui-kit';
import { onPollEndHandler, onPollStartHandler } from '../../services';
import useStyles from './styles';

interface IProps {
  templatePoll: Poll;
  lastActivePoll?: Poll;
}

const PollAction: FC<IProps> = (props) => {
  const { templatePoll, lastActivePoll } = props;

  const root = useKeystone();
  const { ui } = root;
  const classes = useStyles();

  const currentChannel = root.currentChannel;

  const pollStatus = lastActivePoll ? lastActivePoll.status : templatePoll.status;

  const goRoutePollDetail = () => {
    ui.setRoute(`${Routes.PollResultDetail}/${currentChannel?.id}/${templatePoll?.id}`);
  };

  const onPollStart = () => {
    onPollStartHandler({ channel: currentChannel, templatePoll: templatePoll });
  };

  const onPollEnd = () => {
    onPollEndHandler({
      activePoll: lastActivePoll,
      channel: currentChannel,
      defaultErrorAction: () => ui.setRoute(`/${Routes.Polls}`),
    });
  };

  switch (pollStatus) {
    case IPollStatus.New:
      return (
        <Button variant="primary" fullWidth className={classes.actionButton} onClick={onPollStart} data-qa="startPoll">
          <FormattedMessage id="startPoll" />
        </Button>
      );
    case IPollStatus.InProgress:
      return (
        <Button
          variant="contained"
          fullWidth
          className={classes.actionButton}
          onClick={onPollEnd}
          data-qa="completePoll"
        >
          <FormattedMessage id="completePoll" />
        </Button>
      );
    case IPollStatus.Done:
      return (
        <Button
          variant="contained"
          fullWidth
          className={classes.actionButton}
          onClick={goRoutePollDetail}
          data-qa="seeResults"
        >
          <FormattedMessage id="seeResults" />
        </Button>
      );
    default:
      return null;
  }
};

export default PollAction;
