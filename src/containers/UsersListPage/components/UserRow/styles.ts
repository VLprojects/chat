import { makeStyles } from '@mui/styles';
import { COLOURS } from 'theme/consts';

export default makeStyles(
  {
    userRow: {
      padding: '12px 16px',
      '&:hover': {
        backgroundColor: COLOURS.LIGHT_04,
      },
      '&:hover > #sendMessageBtn': {
        display: 'block',
      },
      '& > #sendMessageBtn': {
        display: 'none',
      },
    },
    sendMessageBtn: {
      cursor: 'pointer',
      marginLeft: 'auto',
    },
  },
  { name: 'UserRow' },
);
