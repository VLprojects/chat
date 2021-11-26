import { Badge, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { format, formatDistance, isToday, subDays } from 'date-fns';
import { enGB, ru } from 'date-fns/locale';
import useKeystone from 'keystone';
import Channel from 'keystone/chat/channel';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import Routes from 'routes';
import { COLOURS } from 'theme/consts';
import { MessageTypeEnum } from 'types/enums';
import { Avatar } from 'ui-kit';
import intl from 'utils/intl';

interface IProps {
  channel: Channel;
}

const useStyles = makeStyles({
  channelRow: {
    padding: '12px 16px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: COLOURS.LIGHT_04,
    },
  },
  badge: {
    marginRight: 10,
  },
});

const LastMessage: FC<IProps> = (props) => {
  const { channel } = props;
  const classes = useStyles();
  const { ui } = useKeystone();
  const messages = Array.from(channel?.sortedMessages).reverse();

  const lastMessage = messages && messages.find((m) => m.type !== MessageTypeEnum.System);
  const lastMessageTime = lastMessage?.createdAt ? new Date(lastMessage?.createdAt) : null;
  const onChannelClick = () => ui.setRoute(`${Routes.Channels}/${channel.id}`);

  return (
    <Grid container className={classes.channelRow} onClick={onChannelClick} alignItems="center">
      <Grid item xs={6}>
        <Typography marginBottom="6px">{channel.name}</Typography>
      </Grid>
      <Grid item xs={6} textAlign="right">
        {lastMessageTime && (
          <Typography
            variant="body2"
            fontFamily="PTRootUIWebRegular"
            letterSpacing="0.01em"
            color="textSecondary"
            title={format(lastMessageTime, 'MM/dd/yyyy, HH:mm')}
          >
            {isToday(lastMessageTime)
              ? format(lastMessageTime, 'HH:mm')
              : formatDistance(subDays(lastMessageTime, 3), new Date(), {
                  addSuffix: true,
                  locale: intl.locale === 'ru' ? ru : enGB,
                })}
          </Typography>
        )}
      </Grid>
      <Grid item container alignItems="center" spacing={1} xs={12} wrap="nowrap">
        {lastMessage && (
          <Grid item>
            <Avatar
              name={lastMessage.getUser?.displayName}
              src={lastMessage.getUser?.avatarUrl}
              size="lg"
              avatarColor={lastMessage.getUser?.getAvatarColor}
            />
          </Grid>
        )}

        <Grid item xs zeroMinWidth>
          <Typography variant="subtitle2" color="textSecondary" noWrap>
            {lastMessage?.text || <FormattedMessage id="channelCreated" />}
          </Typography>
        </Grid>
        {lastMessage && <Badge badgeContent={channel.messagesCount} color="primary" className={classes.badge} />}
      </Grid>
    </Grid>
  );
};

export default observer(LastMessage);
