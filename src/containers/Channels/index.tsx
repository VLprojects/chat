import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';

import DirectList from 'components/DirectList';
import ChannelsList from 'components/ChannelList';
import ChatHeader from 'components/Header';
import CreateChannelForm from 'components/CreateChannelForm';
import SubHeader from 'components/SubHeader';

import Routes from 'routes';
import useStores from 'stores/root';
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

const PageChannels: React.FC<RouteComponentProps<{ channelTabType: Routes.Channels | Routes.Direct }>> = (props) => {
  const {
    match: { params },
  } = props;
  const { channelTabType = Routes.Channels } = params;
  const history = useHistory();

  const { channelsStore } = useStores();

  const [tab, setTab] = useState<string>(channelTabType);
  const [isShowCreateChannel, setIsShowCreateChannel] = useState(false);

  const onSelectedChannel = (id: number) => {
    history.push(`/${Routes.Channels}/${id}`);
  };

  const onSelectedDirect = (id: number) => {
    history.push(`/${Routes.Direct}/${id}`);
  };

  const onJoinedChannel = (id: number) => {
    channelsStore.joinChannel(id);
  };

  const onTabClick = (tabId: Routes) => () => {
    history.push(`/${tabId}`);
    setTab(tabId);
  };

  const channelsList: any = [...channelsStore.channels, ...channelsStore.publics];

  return (
    <>
      <ChatHeader title="Chat" />
      <SubHeader>
        <div className={styles.subheader}>
          {tabs.map((item: ITab) => (
            <button
              key={item.id}
              className={[styles.btn, item.id === tab ? styles.active : ''].join(' ')}
              type="button"
              onClick={onTabClick(item.id)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </SubHeader>

      {tab === Routes.Channels && (
        <>
          <ChannelsList list={channelsList} onSelected={onSelectedChannel} onJoined={onJoinedChannel} />
          <button className={styles.btnCreate} type="button" onClick={() => setIsShowCreateChannel(true)}>
            Create a new channel
          </button>

          {isShowCreateChannel && <CreateChannelForm onClose={() => setIsShowCreateChannel(false)} />}
        </>
      )}

      {tab === Routes.Direct && <DirectList list={channelsStore.direct} onSelected={onSelectedDirect} />}
    </>
  );
};

export default observer(PageChannels);
