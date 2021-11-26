import ChannelsList from 'components/ChannelList';
import CreateChannelForm from 'components/CreateChannelForm';
import DirectList from 'components/DirectList';
import SubHeader from 'components/SubHeader';
import useKeystone from 'keystone';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Routes from 'routes';
import { Button } from 'ui-kit';
import HeaderTitle from 'ui-kit/HeaderTitle';
import intl from '../../utils/intl';
import Footer from './components/Footer';
import useStyles from './styles';

interface ITab {
  id: Routes;
  title: string;
  active: boolean;
  show: boolean;
}

const Channels: React.FC<{ channelTabType: Routes.Channels | Routes.Direct }> = (props) => {
  const { channelTabType } = props;
  const { ui, settings } = useKeystone();
  const classes = useStyles();

  const [isShowCreateChannel, setIsShowCreateChannel] = useState(false);

  const tabs: ITab[] = [
    {
      id: Routes.Channels,
      title: intl.formatMessage({ id: 'channels' }),
      active: channelTabType === Routes.Channels,
      show: settings.displayChannelList,
    },
    {
      id: Routes.Direct,
      title: intl.formatMessage({ id: 'direct' }),
      active: channelTabType === Routes.Direct,
      show: settings.displayDirect,
    },
  ];

  const onTabClick = (tabId: Routes) => () => {
    ui.setRoute(`${tabId}`);
  };

  return (
    <>
      {settings.displayHeader && tabs.some((item) => item.show) && (
        <SubHeader>
          {tabs
            .filter((item) => item.show)
            .map((item: ITab) => (
              <Button key={item.id} variant="link" onClick={onTabClick(item.id)} className={classes.button}>
                <HeaderTitle title={item.title} active={item.active} />
              </Button>
            ))}
        </SubHeader>
      )}

      {channelTabType === Routes.Channels && (
        <>
          <ChannelsList />
          {settings.createChannelAllowed && (
            <Button size="medium" variant="primary" onClick={() => setIsShowCreateChannel(true)}>
              <FormattedMessage id="createNewChannel" />
            </Button>
          )}

          {isShowCreateChannel && <CreateChannelForm onClose={() => setIsShowCreateChannel(false)} />}
        </>
      )}

      {channelTabType === Routes.Direct && <DirectList />}
      <Footer />
    </>
  );
};

export default observer(Channels);
