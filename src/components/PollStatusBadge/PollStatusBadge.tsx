import { alpha, Typography } from '@mui/material';
import Box, { BoxProps } from '@mui/system/Box';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { COLOURS } from 'theme/consts';
import { IPollStatus } from 'types/types';

interface IProps extends BoxProps {
  status?: IPollStatus;
}

const getBadgeColor = (status?: IPollStatus) => {
  switch (status) {
    case IPollStatus.New:
      return COLOURS.BLUE;
    case IPollStatus.InProgress:
      return COLOURS.ORANGE;
    case IPollStatus.Done:
      return COLOURS.GREEN;
    default:
      return '';
  }
};
const PollStatusBadge: React.FC<IProps> = (props) => {
  const { status, ...rest } = props;
  const mainColor = getBadgeColor(status);
  return (
    <Box display="inline-block" padding="4px 8px" bgcolor={alpha(mainColor, 0.1)} borderRadius="2px" {...rest}>
      <Typography variant="subtitle2" color={mainColor}>
        <FormattedMessage id={status} />
      </Typography>
    </Box>
  );
};

export default PollStatusBadge;
