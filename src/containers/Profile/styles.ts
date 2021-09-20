import { makeStyles } from '@material-ui/core';
import { COLOURS } from '../../theme/consts';

export default makeStyles(
  {
    container: {
      padding: '40px 40px 20px',
    },
    field: {
      margin: '0 0 20px',
      label: { marginRight: 4, color: COLOURS.TEXT_SECONDARY },
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
