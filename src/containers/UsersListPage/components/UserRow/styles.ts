import { makeStyles } from '@material-ui/core';
import { COLOURS } from '../../../../theme/consts';

export default makeStyles(
  {
    userRow: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      '&:nth-child(2n)': {
        backgroundColor: COLOURS.SURFACE_SECONDARY5,
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
