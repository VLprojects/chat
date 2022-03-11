import { Grid, Typography } from '@mui/material';
import { IServerPollOption } from 'containers/CreatePollPage/types';
import React from 'react';
import { COLOURS } from 'theme/consts';

interface IProps {
  onChange: () => void;
  option: IServerPollOption;
  checked?: boolean;
  dataQA?: string;
}

const OptionBox: React.FC<IProps> = (props) => {
  const { onChange, option, checked, dataQA } = props;

  return (
    <Grid
      item
      xs
      data-qa={dataQA}
      padding="8px 12px"
      borderRadius="10px"
      border={`1px solid ${COLOURS.LIGHT_01}`}
      sx={{
        '&:hover': { backgroundColor: COLOURS.LIGHT_04 },
        backgroundColor: checked ? COLOURS.LIGHT : '',
        wordBreak: 'break-all',
      }}
      onClick={onChange}
    >
      <Typography variant="body2">{option.option}</Typography>
    </Grid>
  );
};
export default OptionBox;
