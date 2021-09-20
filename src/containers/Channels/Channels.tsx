import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ChannelsList from 'components/ChannelList';
import CreateChannelForm from 'components/CreateChannelForm';
import DirectList from 'components/DirectList';
import SubHeader from 'components/SubHeader';
import useKeystone from 'keystone';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Routes from 'routes';
import Footer from './components/Footer';
import useStyles from './styles';

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

const Channels: React.FC<{ channelTabType: Routes.Channels | Routes.Direct }> = (props) => {
  const classes = useStyles();
  const { channelTabType } = props;
  const { ui, settings } = useKeystone();
  const [tab, setTab] = useState<string>(channelTabType);
  const [isShowCreateChannel, setIsShowCreateChannel] = useState(false);

  const onTabClick = (tabId: Routes) => () => {
    ui.setRoute(`${tabId}`);
    setTab(tabId);
  };

  return (
    <>
      {settings.displayDirect && (
        <SubHeader>
          <Grid container justifyContent="space-around" alignItems="center">
            {tabs.map((item: ITab) => (
              <Grid item key={item.id} className={classes.btn} onClick={onTabClick(item.id)}>
                <Typography variant="h4" color="textPrimary">
                  {item.title}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </SubHeader>
      )}

      {tab === Routes.Channels && (
        <>
          <ChannelsList />
          {settings.createChannelAllowed && (
            <button className={classes.btnCreate} type="button" onClick={() => setIsShowCreateChannel(true)}>
              Create a new channel
            </button>
          )}

          {isShowCreateChannel && <CreateChannelForm onClose={() => setIsShowCreateChannel(false)} />}
        </>
      )}

      {tab === Routes.Direct && <DirectList />}
      <Footer />
    </>
  );
};

export default observer(Channels);
