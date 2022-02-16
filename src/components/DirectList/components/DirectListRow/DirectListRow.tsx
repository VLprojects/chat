import { Grid, Typography } from '@mui/material';
import Channel from 'keystone/chat/channel';
import User from 'keystone/chat/user';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { Avatar } from 'ui-kit';
import { getPreparedDate } from 'utils/date';
import useStyles from './styles';

interface IProps {
  channel: Channel;
  user: User;
  clickRowHandler: (id: string) => void;
  directChannelName: string;
}
const DirectListRow: FC<IProps> = (props) => {
  const { channel, user, clickRowHandler, directChannelName } = props;
  const classes = useStyles();
  const lastMessage = channel.lastMessage;

  const onClick = () => clickRowHandler(channel.id);

  return (
    <Grid item container wrap="nowrap" columnGap={1} className={classes.row} onClick={onClick} alignItems="center">
      <Grid
        item
        xs
        component={Avatar}
        src={user?.avatarUrl}
        avatarColor={user.getAvatarColor}
        size="lg"
        name={user.displayName}
      />
      <Grid item container direction="column">
        <Grid item container alignItems="center" wrap="nowrap">
          <Grid item xs={6} component={Typography}>
            {directChannelName}
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
        </Grid>
        <Grid item container alignItems="center" wrap="nowrap">
          <Grid item xs zeroMinWidth>
            <Typography variant="subtitle2" color="textSecondary" noWrap>
              {lastMessage?.text || <FormattedMessage id="channelCreated" />}
            </Typography>
          </Grid>

          {/* {lastMessage && (
            <Grid item>
              <Badge badgeContent={channel.messagesCount} color="primary" className={classes.badge} />
            </Grid>
          )} */}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default observer(DirectListRow);
