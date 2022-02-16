import { makeStyles } from '@mui/styles';
import { COLOURS } from '../../../../theme/consts';

export default makeStyles(
  {
    button: {
      height: '48px',
      border: '2px',
      borderColor: COLOURS.WHITE,
      borderStyle: 'solid',
    },
    buttonGridItem: {
      '& > *': {
        paddingTop: '10px !important',
      },
    },
  },
  { name: 'SelectPollType' },
);
