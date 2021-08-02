import ChatFooter from 'components/Footer';
import ChatHeader from 'components/Header';
import MessageInput from 'components/MessageInput';
import MessageList from 'components/MessageList';
import SubHeader from 'components/SubHeader';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useStores from 'stores/rootStore';

interface ParamTypes {
  id: string;
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
      {/* <MessageList messages={[]} /> */}
      <ChatFooter>
        <MessageInput channelId={Number(directId)} type="direct" />
      </ChatFooter>
    </>
  );
});

export default PageDirectId;
