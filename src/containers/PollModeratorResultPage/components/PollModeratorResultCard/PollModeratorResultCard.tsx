import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/system/colorManipulator';
import useKeystone from 'keystone';
import Poll from 'keystone/chat/poll';
import { observer } from 'mobx-react';
import React from 'react';
import { COLOURS } from 'theme/consts';
import { formatDate, getPreparedDate } from 'utils/date';

import IOptionRow from '../OptionRow';
import OptionRowOpenEnded from '../OptionRowOpenEnded';

interface IProps {
  poll: Poll;
}

const PollModeratorResultCard: React.FC<IProps> = (props) => {
  const { poll } = props;
  const root = useKeystone();

  /*
    эта бесполезная херь, заставляет тригерится компонент, когда клиент голосует, и мы получаем обновление в channel.polls[idx].votesCount
    я не понимаю как должен работать этот е*ый mobx
  */
  const myVar = root.currentChannel?.getPollList;

  return (
    <Grid item width="100%">
      <Paper sx={{ backgroundColor: COLOURS.LIGHT_04, margin: '0px 12px 13px' }} elevation={0}>
        <Grid container justifyContent="space-between" padding="16px 12px">
          <Typography variant="h4">{getPreparedDate(poll.stoppedAt || poll.createdAt, true)}</Typography>
          <Typography variant="subtitle2" color={alpha(COLOURS.BLACK_01, 0.5)}>
            {formatDate(poll.stoppedAt || poll.createdAt)}
          </Typography>
        </Grid>
        <Divider />
        <Grid item container padding="13px 14px" rowGap={3}>
          {poll.options.map((option) => (
            <IOptionRow key={option.id} option={option} />
          ))}

          {poll.isOpenEnded && <OptionRowOpenEnded length={poll.votes?.length || 0} pollId={poll.id} />}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default observer(PollModeratorResultCard);
