import { makeStyles } from '@mui/styles';
import { COLOURS } from 'theme/consts';

export default makeStyles(
  {
    row: {
      padding: '12px 16px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: COLOURS.LIGHT_04,
      },
    },
    badge: {
      marginRight: 10,
    },
  },
  { name: 'DirectListRow' },
);
