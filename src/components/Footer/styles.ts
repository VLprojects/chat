import { makeStyles } from '@material-ui/core';
import { COLOURS } from '../../theme/consts';

export default makeStyles(
  {
    footer: {
      padding: '14px 16px',
      background: COLOURS.SURFACE_PRIMARY,
      borderRadius: '15px 15px 0px 0px',
    },
  },
  { name: 'Footer' },
);
