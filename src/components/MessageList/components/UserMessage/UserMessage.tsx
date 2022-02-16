import { Box, ClickAwayListener, Grid, Typography } from '@mui/material';
import cls from 'classnames';
import useKeystone from 'keystone';
import Message from 'keystone/chat/message';
import Linkify from 'linkify-react';
import React, { FC, memo, useState } from 'react';
import { COLOURS } from 'theme/consts';
import { ChannelTypeEnum } from 'types/enums';
import { Avatar } from 'ui-kit';
import MoreHoriz from 'ui-kit/icons/MoreHoriz';
import { formatDate, getPreparedDate } from 'utils/date';
import MessageActions from '../MessageActions';
import UserMessageDisplayName from './components/UserMessageDisplayName';
import useStyles from './styles';

export interface IProps {
  index: number;
  message: Message;
  short?: boolean;
  showLineTime: boolean;
}

const UserMessage: FC<IProps> = (props) => {
  const { message, short, index, showLineTime } = props;
  const { auth, chat, ui } = useKeystone();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const user = message?.user?.current;
  const own = message?.user?.current.id === `${auth.me.id}`;

  const channelId = String(ui.params.id);

  const currentChannel = chat.channels.get(channelId);
  const isPublic = currentChannel?.type === ChannelTypeEnum.Public;

  const classes = useStyles({ user });
  const showActionButtons = auth.isModerator && isPublic && open;

  if (!user) return null;

  return (
    <>
      {!short && (
        <Grid
          container
          alignItems="center"
          direction={own ? 'row-reverse' : 'row'}
          paddingTop={index ? '24px' : '10px'}
        >
          <Grid
            item
            component={Avatar}
            name={user.displayName}
            src={user.avatarUrl}
            size="lg"
            avatarColor={user?.getAvatarColor}
          />
          <Grid item marginLeft="8px" marginRight="12px">
            <UserMessageDisplayName user={user} />
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
            letterSpacing="0.01em"
            component="span"
            sx={{ color: own ? COLOURS.MESSAGE_DATE_COLOR_OWN : COLOURS.MESSAGE_DATE_COLOR }}
          >
            {formatDate(message.createdAt)}
          </Typography>
          {showActionButtons && (
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <Box
                position="absolute"
                width="24px"
                height="24px"
                display="flex"
                right="-12px"
                top="-4px"
                sx={{
                  justifyContent: 'center',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.07)',
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <MessageActions messageId={+message.id} icon={<MoreHoriz fill={hover ? 'black' : COLOURS.GREY} />} />
              </Box>
            </ClickAwayListener>
          )}
        </Grid>
      </Grid>
      {showLineTime && (
        <Typography color="textSecondary" variant="body2" textAlign="center" marginTop="24px">
          {getPreparedDate(message.createdAt)}
        </Typography>
      )}
    </>
  );
};

export default memo(UserMessage);
