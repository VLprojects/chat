import { Grid, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import cls from 'classnames';
import { format, formatDistance, isToday, subDays } from 'date-fns';
import { enGB, ru } from 'date-fns/locale';
import Linkify from 'linkify-react';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Avatar } from 'ui-kit';
import User from '../../../../keystone/chat/user';
import intl from '../../../../utils/intl';
import useCommonStyles from '../../styles';
import MessageActions from '../MessageActions';
import useStyles from './styles';

export interface IProps {
  own?: boolean;
  user: User;
  message: string;
  date: Date;
  short?: boolean;
  isModerator?: boolean;
  messageId: number;
}

const UserMessage: FC<IProps> = (props) => {
  const { own = false, user, message = '', date, short = false, isModerator, messageId } = props;
  const classes = useStyles(props);
  const commonClasses = useCommonStyles();

  if (!user) return null;

  return (
    <>
      {!short && (
        <Grid container alignItems="center" direction={own ? 'row-reverse' : 'row'}>
          <Grid
            item
            component={Avatar}
            name={user.displayName}
            src={user.avatarUrl}
            size="lg"
            avatarColor={user?.avatarColor}
          />
          <Grid className={classes.displayName} item>
            <Typography variant="body2" fontWeight="bold">
              {user?.displayName}
            </Typography>
          </Grid>

          <Typography
            variant="body2"
            fontFamily="PTRootUIWebRegular"
            letterSpacing="0.01em"
            color="textSecondary"
            title={format(date, 'MM/dd/yyyy, HH:mm')}
          >
            {isToday(date)
              ? format(date, 'HH:mm')
              : formatDistance(subDays(date, 3), new Date(), {
                  addSuffix: true,
                  locale: intl.locale === 'ru' ? ru : enGB,
                })}
          </Typography>
        </Grid>
      )}

      <Grid container alignItems="center" direction={own ? 'row-reverse' : 'row'}>
        <Grid
          item
          data-qa="chat-msg"
          className={cls(commonClasses.message, classes.userMessage, { [classes.userMessageOwn]: own })}
        >
          <Tooltip
            placement={own ? 'left' : 'right'}
            title={isModerator ? <MessageActions messageId={messageId} /> : false}
            classes={{ tooltip: classes.tooltip }}
          >
            <Typography>
              <Linkify options={{ target: '_blank' }}>{message}</Linkify>
            </Typography>
          </Tooltip>
        </Grid>
        {}
      </Grid>
    </>
  );
};

export default observer(UserMessage);
