import React, { FC } from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import useStyles from './styles';
import { IServerPollVote } from '../../../CreatePollPage/types';

interface IProps {
  vote: IServerPollVote;
}

const PollDetailOpenEnded: FC<IProps> = (props) => {
  const { vote } = props;
  const classes = useStyles();

  return (
    <Card classes={{ root: classes.root }}>
      <CardHeader
        sx={{ wordBreak: 'break-all', pb: 0 }}
        subheader={vote.user.username}
        subheaderTypographyProps={{
          variant: 'body2',
        }}
      />
      <CardContent sx={{ wordBreak: 'break-all' }}>{vote.answer}</CardContent>
    </Card>
  );
};

export default PollDetailOpenEnded;
