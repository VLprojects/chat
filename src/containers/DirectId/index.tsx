import ChatFooter from 'components/Footer';
import MessageInput from 'components/MessageInput';
import MessageList from 'components/MessageList';
import SubHeader from 'components/SubHeader';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

interface ParamTypes {
  id: string;
}

// todo component is under construction
const PageDirectId = observer(() => {
  const history = useHistory();
  const { id: directId } = useParams<ParamTypes>();


  return (
    <>
      <SubHeader onBack={() => history.push('/direct')}>
        <div>Participant name</div>
      </SubHeader>
      {/* <MessageList messages={[]} /> */}
      <ChatFooter>
        <MessageInput channelId={directId} />
      </ChatFooter>
    </>
  );
});

export default PageDirectId;
