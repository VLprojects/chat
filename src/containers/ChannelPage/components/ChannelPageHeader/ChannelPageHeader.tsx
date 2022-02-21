import { Box, Typography } from '@mui/material';
import { getDirectChannelName } from 'components/DirectList/service';
import SubHeader from 'components/SubHeader';
import useKeystone from 'keystone';
import Channel from 'keystone/chat/channel';
import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import Routes from 'routes';
import { ChannelTypeEnum } from 'types/enums';
import { Button } from 'ui-kit';
import HeaderTitle from 'ui-kit/HeaderTitle';

interface IProps {
  currentChannel: Channel;
  isModerator: boolean;
}
const ChannelPageHeader: FC<IProps> = (props) => {
  const { currentChannel, isModerator } = props;
  const root = useKeystone();
  const { ui, settings } = root;
  const isPublic = currentChannel?.type === ChannelTypeEnum.Public;
  const isDirect = currentChannel?.type === ChannelTypeEnum.Direct;

  const { displayChannelList, displayDirect } = settings;
  const showBackForDirect = !displayChannelList && isDirect;

  const onPollsClick = useCallback(() => {
    ui.setRoute(`${Routes.Polls}/${currentChannel.id}`);
  }, []);
  const onDirectClick = useCallback(() => {
    ui.setRoute(`${Routes.Direct}`);
  }, []);

  const channelName =
    currentChannel.type === ChannelTypeEnum.Direct
      ? getDirectChannelName(root, currentChannel.id)
      : currentChannel?.name;

  const goBack = useCallback(() => {
    ui.back();
  }, []);

  return (
    <SubHeader onBack={displayChannelList || showBackForDirect ? goBack : undefined}>
      <HeaderTitle title={channelName} active sx={{ maxWidth: isModerator ? '40%' : '70%' }} />

      {isModerator && isPublic && (
        <Box ml={4}>
          <Button data-qa="pollStart" variant="link" onClick={onPollsClick}>
            <HeaderTitle>
              <Typography>
                <FormattedMessage id="polls" />
              </Typography>
            </HeaderTitle>
          </Button>
        </Box>
      )}
      {displayDirect && isPublic && (
        <Box ml={4}>
          <HeaderTitle>
            <Button data-qa="onDirectClick" variant="link" onClick={onDirectClick}>
              <Typography>
                <FormattedMessage id="menu.direct" />
              </Typography>
            </Button>
          </HeaderTitle>
        </Box>
      )}
    </SubHeader>
  );
};

export default observer(ChannelPageHeader);
