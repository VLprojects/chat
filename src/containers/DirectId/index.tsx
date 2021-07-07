import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams, useHistory } from 'react-router-dom';

import ChatHeader from 'components/Header';
import SubHeader from 'components/SubHeader';
import ChatFooter from 'components/Footer';
import MessageInput from 'components/MessageInput';
import MessageList from 'components/MessageList';

import useStores from 'stores/root';

interface ParamTypes {
  id: string
}

const PageDirectId = observer(() => {
  const history = useHistory();
  const { id: directId } = useParams<ParamTypes>();
  const { channelsStore } = useStores();

  const currentDirect: any = channelsStore.direct?.find((item: any) => item.id === Number(directId));

  return (
    <>
      <ChatHeader title="Chat" />
      <SubHeader onBack={() => history.push('/direct')}>
        <div>{currentDirect?.username}</div>
      </SubHeader>
      <MessageList messages={[]} />
      <ChatFooter>
        <MessageInput channelId={Number(directId)} type="direct" />
      </ChatFooter>
    </>
  );
});

export default PageDirectId;
