import { deletePoll } from 'containers/PollListPage/services';
import useKeystone from 'keystone';
import Poll from 'keystone/chat/poll';
import { observer } from 'mobx-react';
import React from 'react';
import { useIntl } from 'react-intl';
import PollCard from '../PollCard';

const TemplateList: React.FC = () => {
  const root = useKeystone();
  const intl = useIntl();

  const currentChannel = root.currentChannel;
  const pollTemplates = currentChannel?.getPollTemplates;

  const onDeletePoll = async (poll: Poll) => {
    if (confirm(intl.formatMessage({ id: 'areYouSure' }))) {
      if (await deletePoll(+poll.id)) {
        currentChannel?.deletePoll(poll);
      }
    }
  };

  return (
    <>
      {pollTemplates?.map((poll) => (
        <PollCard key={`${poll.question}-${poll.id}`} templatePoll={poll} onDelete={onDeletePoll} />
      ))}
    </>
  );
};

export default observer(TemplateList);
