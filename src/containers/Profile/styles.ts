import { makeStyles } from '@material-ui/core';
import { COLOURS } from '../../theme/consts';

export default makeStyles(
  {
    container: {
      width: '100%',
      height: '100%',
      marginTop: 1,
      backgroundColor: COLOURS.SURFACE_PRIMARY,
      padding: '40px 40px 20px',
    },
    field: {
      margin: '0 0 20px',
      label: { marginRight: 4, color: '#aaa' },
    },
    error: {
      display: 'inline-block',
      borderRadius: 4,
      background: 'red',
      color: '#fff',
      padding: '4px 8px',
    },
  },
  { name: 'Profile' },
);
