import { Grid, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import cls from 'classnames';
import { format, formatDistance, isToday, subDays } from 'date-fns';
import { enGB, ru } from 'date-fns/locale';
import useKeystone from 'keystone';
import Message from 'keystone/chat/message';
import Linkify from 'linkify-react';
import React, { FC, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Avatar } from 'ui-kit';
import intl from '../../../../utils/intl';
import MessageActions from '../MessageActions';
import useStyles from './styles';

export interface IProps {
  index: number;
  message: Message;
  short?: boolean;
}

const UserMessage: FC<IProps> = (props) => {
  const { message, short, index } = props;
  const { auth } = useKeystone();
  const [open, setOpen] = useState(false);
  const user = message?.user?.current;
  const own = message?.user?.current.id === `${auth.me.id}`;
  const messageCreatedAt = new Date(message.createdAt);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  const classes = useStyles({ user });

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
            <Typography variant="body2" fontWeight={600}>
              {user?.displayName}
            </Typography>
          </Grid>

          <Typography
            variant="body2"
            fontFamily="PTRootUIWebRegular"
            letterSpacing="0.01em"
            color="textSecondary"
            title={format(messageCreatedAt, 'MM/dd/yyyy, HH:mm')}
          >
            {isToday(messageCreatedAt)
              ? format(messageCreatedAt, 'HH:mm')
              : formatDistance(subDays(messageCreatedAt, 3), new Date(), {
                  addSuffix: true,
                  locale: intl.locale === 'ru' ? ru : enGB,
                })}
          </Typography>
        </Grid>
      )}

      <Grid
        container
        alignItems="center"
        direction={own ? 'row-reverse' : 'row'}
        paddingTop={short ? '10px' : 0}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        ref={ref}
      >
        <Tooltip
          disableHoverListener
          placement={own ? 'right' : 'left'}
          title={auth.isModerator ? <MessageActions messageId={+message.id} /> : false}
          classes={{ tooltip: classes.tooltip }}
          open={inView && open}
        >
          <Typography
            data-qa="chat-msg"
            className={cls(classes.message, { [classes.ownMessage]: own, [classes.otherUserMessage]: !own })}
          >
            <Linkify options={{ target: '_blank' }}>{message.text}</Linkify>
          </Typography>
        </Tooltip>
      </Grid>
    </>
  );
};

export default UserMessage;
