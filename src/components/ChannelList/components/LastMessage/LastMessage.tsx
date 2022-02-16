import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import useKeystone from 'keystone';
import Channel from 'keystone/chat/channel';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import Routes from 'routes';
import { COLOURS } from 'theme/consts';
import { Avatar } from 'ui-kit';
import { getPreparedDate } from 'utils/date';

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

  const lastMessage = channel.lastMessage;

  const onChannelClick = () => ui.setRoute(`${Routes.Channels}/${channel.id}`);

  return (
    <Grid container className={classes.channelRow} onClick={onChannelClick} alignItems="center">
      <Grid item xs={6}>
        <Typography marginBottom="6px">{channel.name}</Typography>
      </Grid>
      <Grid item xs={6} textAlign="right">
        <Typography
          variant="body2"
          fontFamily="PTRootUIWebRegular"
          letterSpacing="0.01em"
          color="textSecondary"
          component="span"
        >
          {getPreparedDate(lastMessage?.createdAt)}
        </Typography>
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
        {/* {lastMessage && <Badge badgeContent={channel.messagesCount} color="primary" className={classes.badge} />} */}
      </Grid>
    </Grid>
  );
};

export default observer(LastMessage);
