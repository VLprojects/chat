import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/system/colorManipulator';
import { IServerPollOption } from 'containers/CreatePollPage/types';
import { observer } from 'mobx-react';
import React from 'react';
import { COLOURS } from 'theme/consts';

import IOptionRowWrapper from '../OptionRowWrapper';

interface IOptionRowProps {
  option: IServerPollOption;
}

const IOptionRow: React.FC<IOptionRowProps> = (props) => {
  const { option } = props;

  return (
    <IOptionRowWrapper>
      <Grid
        item
        xs
        component={Typography}
        variant="subtitle2"
        color={option.valid ? COLOURS.GREEN : COLOURS.BLACK_01}
        sx={{ wordBreak: 'break-word' }}
      >
        {option.option}
      </Grid>
      <Grid
        item
        component={Typography}
        variant="subtitle2"
        color={option.valid ? COLOURS.GREEN : alpha(COLOURS.BLACK_01, 0.5)}
      >
        {option.votesCount}
      </Grid>
    </IOptionRowWrapper>
  );
};

export default observer(IOptionRow);
