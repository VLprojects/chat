import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useKeystone from 'keystone';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Routes from 'routes';
import { Button } from 'ui-kit';
import PollMessageIcon from 'ui-kit/icons/PollMessageIcon';
import IOptionRowWrapper from '../OptionRowWrapper';

interface IProps {
  length: number;
  pollId: string;
}
const OptionRowOpenEnded: React.FC<IProps> = (props) => {
  const root = useKeystone();
  const { id } = root.ui.params;
  const { length, pollId } = props;

  const goOpenEndedPollDetail = () => {
    root.ui.setRoute(`${Routes.PollResultOpenEndedDetail}/${id}/${pollId}`);
  };
  const disabled = !!length;

  return (
    <IOptionRowWrapper>
      <Button variant="link" marginLeft="6px" onClick={goOpenEndedPollDetail} disabled={!disabled}>
        <Grid container wrap="nowrap" alignItems="center" columnGap="6px">
          <PollMessageIcon />
          <Typography variant="subtitle2">
            <FormattedMessage id="poll.answers" values={{ number: length }} />
          </Typography>
        </Grid>
      </Button>
    </IOptionRowWrapper>
  );
};

export default OptionRowOpenEnded;
