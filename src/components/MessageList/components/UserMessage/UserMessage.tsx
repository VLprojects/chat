import cls from 'classnames';
import Linkify from 'linkify-react';
import Message from 'keystone/chat/message';
import MessageActions from '../MessageActions';
import MoreHoriz from 'ui-kit/icons/MoreHoriz';
import React, { FC, useState } from 'react';
import useKeystone from 'keystone';
import User from 'keystone/chat/user';
import UserMessageAvatar from './components/UserMessageAvatar';
import UserMessageDisplayName from './components/UserMessageDisplayName';
import useStyles from './styles';
import { Box, ClickAwayListener, Grid, Typography } from '@mui/material';
import { ChannelTypeEnum } from 'types/enums';
import { COLOURS } from 'theme/consts';
import { formatDate, getPreparedDate } from 'utils/date';

export interface IProps {
  index: number;
  message: Message;
  user?: User;
  short?: boolean;
  showLineTime: boolean;
}

const UserMessage: FC<IProps> = (props) => {
  const { message, short, index, showLineTime, user } = props;
  const { auth, chat, ui } = useKeystone();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const own = user?.id === `${auth.me.id}`;

  const channelId = String(ui.params.id);

  const currentChannel = chat.channels.get(channelId);
  const isPublic = currentChannel?.type === ChannelTypeEnum.Public;

  const classes = useStyles({ user });
  const showActionButtons = auth.isModerator && isPublic && open;

  if (!user) return null;

  return (
    <>
      {showLineTime && (
        <Typography color="textSecondary" variant="body2" textAlign="center" marginTop="24px">
          {getPreparedDate(message.createdAt, true)}
        </Typography>
      )}
      {!short && (
        <Grid
          container
          alignItems="center"
          direction={own ? 'row-reverse' : 'row'}
          paddingTop={index ? '24px' : '10px'}
        >
          <UserMessageAvatar user={user} />
          <Grid item marginLeft="8px" marginRight="12px" zeroMinWidth>
            <UserMessageDisplayName user={user} own={own} />
          </Grid>
        </Grid>
      )}

      <Grid
        container
        alignItems="center"
        direction={own ? 'row-reverse' : 'row'}
        paddingTop={short ? '10px' : 0}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Grid
          item
          container
          className={cls(classes.message, { [classes.ownMessage]: own, [classes.otherUserMessage]: !own })}
          position="relative"
          width="auto"
          alignItems="center"
          columnGap={0.8}
          wrap="nowrap"
        >
          <Grid item component={Typography} xs data-qa="chat-msg">
            <Linkify options={{ target: '_blank' }}>{message.text}</Linkify>
          </Grid>
          <Typography
            alignSelf="end"
            variant="subtitle2"
            fontFamily="PTRootUIWebRegular"
            fontSize={11}
            pl={0.5}
            letterSpacing="0.01em"
            component="span"
            sx={{ color: own ? COLOURS.LIGHT_03 : COLOURS.MESSAGE_DATE_COLOR }}
          >
            {formatDate(message.createdAt)}
          </Typography>
          {showActionButtons && (
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <Box
                position="absolute"
                width="24px"
                height="24px"
                right="-10px"
                top="-8px"
                sx={{
                  justifyContent: 'center',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.07)',
                  backgroundColor: COLOURS.WHITE,
                  borderRadius: '50px',
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <MessageActions
                  messageId={+message.id}
                  icon={<MoreHoriz fill={hover ? COLOURS.BLACK : COLOURS.GREY} />}
                />
              </Box>
            </ClickAwayListener>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default UserMessage;
