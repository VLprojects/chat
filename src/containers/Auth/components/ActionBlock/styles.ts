import { makeStyles } from '@mui/styles';
import { COLOURS } from 'theme/consts';

export default makeStyles(
  {
    footerActions: {
      '& > a': {
        color: COLOURS.BLUE,
      },
    },
  },
  { name: 'ActionBlock' },
);
