import ChannelsList from 'components/ChannelList';
import CreateChannelForm from 'components/CreateChannelForm';
import DirectList from 'components/DirectList';
import ChatHeader from 'components/Header';
import SubHeader from 'components/SubHeader';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Routes from 'routes';
import useStores from 'stores/rootStore';
import styles from './Channels.module.scss';

interface ITab {
  id: Routes;
  title: string;
}

const tabs: ITab[] = [
  {
    id: Routes.Channels,
    title: 'Channels',
  },
  {
    id: Routes.Direct,
    title: 'Direct',
  },
];

const PageChannels: React.FC<{ channelTabType: Routes.Channels | Routes.Direct }> = (props) => {
  const { channelTabType } = props;

  const { channelsStore, chatStore } = useStores();

  const [tab, setTab] = useState<string>(channelTabType);
  const [isShowCreateChannel, setIsShowCreateChannel] = useState(false);

  const onSelectedChannel = (id: number) => {
    chatStore.setRoute(`${Routes.Channels}/${id}`);
  };

  const onSelectedDirect = (id: number) => {
    chatStore.setRoute(`${Routes.Direct}/${id}`);
  };

  const onJoinedChannel = (id: number) => {
    channelsStore.joinChannel(id);
  };

  const onTabClick = (tabId: Routes) => () => {
    chatStore.setRoute(`${tabId}`);
    setTab(tabId);
  };

  const channelsList: any = [...channelsStore.channels, ...channelsStore.publics];

  return (
    <>
      <ChatHeader title="Chat" />
      {chatStore.isDirectAllowed && (
        <SubHeader>
          <div className={styles.subheader}>
            {tabs.map((item: ITab) => (
              <div
                key={item.id}
                className={[styles.btn, item.id === tab ? styles.active : ''].join(' ')}
                onClick={onTabClick(item.id)}
              >
                {item.title}
              </div>
            ))}
          </div>
        </SubHeader>
      )}

      {tab === Routes.Channels && (
        <>
          <ChannelsList list={channelsList} onSelected={onSelectedChannel} onJoined={onJoinedChannel} />
          {chatStore.isCreateChannelAllowed && (
            <button className={styles.btnCreate} type="button" onClick={() => setIsShowCreateChannel(true)}>
              Create a new channel
            </button>
          )}

          {isShowCreateChannel && <CreateChannelForm onClose={() => setIsShowCreateChannel(false)} />}
        </>
      )}

      {tab === Routes.Direct && <DirectList list={channelsStore.direct} onSelected={onSelectedDirect} />}
    </>
  );
};

export default observer(PageChannels);
