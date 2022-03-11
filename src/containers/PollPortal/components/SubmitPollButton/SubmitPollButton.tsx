import Box from '@mui/material/Box';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'ui-kit';

interface IProps {
  dataQA?: string;
  onSubmit: () => void;
  disabled: boolean;
}

const SubmitPollButton: React.FC<IProps> = (props) => {
  const { dataQA, onSubmit, disabled } = props;
  return (
    <Box
      component={Button}
      marginTop="16px"
      variant="contained"
      fullWidth
      disabled={disabled}
      // Used by Automation tests
      data-qa={dataQA}
      onClick={onSubmit}
    >
      <FormattedMessage id="reply" />
    </Box>
  );
};

export default SubmitPollButton;
