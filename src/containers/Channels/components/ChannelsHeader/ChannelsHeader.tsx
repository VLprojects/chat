import SubHeader from 'components/SubHeader';
import useKeystone from 'keystone';
import React from 'react';
import { useIntl } from 'react-intl';
import Routes from 'routes';
import { Button } from 'ui-kit';
import HeaderTitle from 'ui-kit/HeaderTitle';
import { IProps as IParentProps } from '../../Channels';
import useStyles from './styles';

interface IProps extends IParentProps {}

const ChannelsHeader: React.FC<IProps> = (props) => {
  const { channelTabType } = props;
  const classes = useStyles();
  const intl = useIntl();
  const { ui, settings } = useKeystone();

  const showBackButton = channelTabType === Routes.Direct && !settings.displayChannelList;

  const onTabClick = (tabId: string) => () => {
    ui.setRoute(`${tabId}`);
  };

  const onBack = () => {
    if (channelTabType === Routes.Direct) {
      ui.back();
    }
  };

  return (
    <SubHeader onBack={showBackButton ? onBack : undefined}>
      {settings.displayChannelList && (
        <Button variant="link" onClick={onTabClick(Routes.Channels)} className={classes.button}>
          <HeaderTitle title={intl.formatMessage({ id: 'channels' })} active={channelTabType === Routes.Channels} />
        </Button>
      )}
      {settings.displayDirect && (
        <Button variant="link" onClick={onTabClick(Routes.Direct)} className={classes.button}>
          <HeaderTitle title={intl.formatMessage({ id: 'direct' })} active={channelTabType === Routes.Direct} />
        </Button>
      )}
    </SubHeader>
  );
};

export default ChannelsHeader;
