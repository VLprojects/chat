import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton, Typography } from '@mui/material';
import { deletePinnedMessage } from 'containers/ChannelPage/service';
import { format } from 'date-fns';
import useKeystone from 'keystone';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { UserRoleEnum } from 'types/enums';
import PinnedIcon from 'ui-kit/icons/PinnedIcon';
import { checkDateWhen, formatDate } from 'utils/date';
import useStyles from './styles';
import { zINDEX } from 'theme/consts';
import { fetchMessagesBefore } from 'keystone/service';

const PinnedMessageList: React.FC = () => {
  const classes = useStyles();
  const root = useKeystone();
  const { ui, chat, auth } = root;
  const channelId = String(ui.params.id);
  const currentChannel = chat.channels.get(channelId);

  const pinnedMessage = currentChannel?.lastPinnedMessage;
  if (!pinnedMessage) return null;

  const user = pinnedMessage.user.current;
  const date = new Date(pinnedMessage.message.createdAt);

  const onDeletePinnedMessage = () => deletePinnedMessage(pinnedMessage.id);

  const scrollToPinnedMessage = async () => {
    const msgIdx = currentChannel.findMessageIdx(pinnedMessage.messageId);

    if (msgIdx > -1) {
      ui.jumpToMessage(msgIdx);
    } else {
      await fetchMessagesBefore(root, Number(channelId), Number(currentChannel.sortedMessages[0].id), {
        until: Number(pinnedMessage.messageId),
      });
      setTimeout(() => {ui.jumpToMessage(0);}, 1000);
    }
  };

  return (
    <Grid
      container
      className={classes.root}
      columnGap={1}
      alignItems="center"
      wrap="nowrap"
      sx={{
        backgroundColor: 'white',
        zIndex: zINDEX,
      }}
    >
      <Grid item xs>
        <PinnedIcon />
      </Grid>
      <Grid item xs={10} container sx={{ cursor: 'pointer' }} onClick={scrollToPinnedMessage}>
        <Typography variant="body2" fontWeight="bold">
          {user.displayName}
        </Typography>
        <Typography
          variant="body2"
          fontFamily="PTRootUIWebRegular"
          letterSpacing="0.01em"
          color="textSecondary"
          title={format(date, 'MM/dd/yyyy, HH:mm')}
          marginLeft="8px"
        >
          {formatDate(
            pinnedMessage.message.createdAt,
            `dd MMMM ${!checkDateWhen(pinnedMessage.message.createdAt, 'year') ? 'yyyy' : ''} HH:mm`,
          )}
        </Typography>

        <Grid item xs={12}>
          <Typography noWrap>{pinnedMessage.message.text}</Typography>
        </Grid>
      </Grid>
      {auth.me.role === UserRoleEnum.Moderator && (
        <Grid item xs={1}>
          <IconButton size="small" onClick={onDeletePinnedMessage}>
            <CloseIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

export default observer(PinnedMessageList);
