import { Grid, Typography } from '@mui/material';
import cls from 'classnames';
import ChannelsList from 'components/ChannelList';
import CreateChannelForm from 'components/CreateChannelForm';
import DirectList from 'components/DirectList';
import SubHeader from 'components/SubHeader';
import useKeystone from 'keystone';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Routes from 'routes';
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
  const classes = useStyles();
  const { channelTabType } = props;
  const { ui, settings } = useKeystone();

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
          <Grid container justifyContent="space-around" alignItems="center">
            {tabs
              .filter((item) => item.show)
              .map((item: ITab) => (
                <Grid
                  item
                  key={item.id}
                  className={cls(classes.btn, { [classes.btnActive]: item.active })}
                  onClick={onTabClick(item.id)}
                >
                  <Typography variant="h4" color="textPrimary">
                    {item.title}
                  </Typography>
                </Grid>
              ))}
          </Grid>
        </SubHeader>
      )}

      {channelTabType === Routes.Channels && (
        <>
          <ChannelsList />
          {settings.createChannelAllowed && (
            <button className={classes.btnCreate} type="button" onClick={() => setIsShowCreateChannel(true)}>
              <FormattedMessage id="createNewChannel" />
            </button>
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
