import ChannelsList from 'components/ChannelList';
import CreateChannelForm from 'components/CreateChannelForm';
import DirectList from 'components/DirectList';
import useKeystone from 'keystone';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Routes from 'routes';
import { Button } from 'ui-kit';
import ChannelsHeader from './components/ChannelsHeader';
import Footer from './components/Footer';

export interface IProps {
  channelTabType: Routes.Channels | Routes.Direct;
}

const Channels: React.FC<IProps> = (props) => {
  const { channelTabType } = props;
  const { settings, auth } = useKeystone();

  const [isShowCreateChannel, setIsShowCreateChannel] = useState(false);

  return (
    <>
      {(settings.displayHeader || auth.isModerator) && <ChannelsHeader channelTabType={channelTabType} />}

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
      {settings.displayFooter && <Footer />}
    </>
  );
};

export default observer(Channels);
