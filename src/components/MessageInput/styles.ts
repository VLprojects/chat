import { makeStyles } from '@material-ui/core';
import { COLOURS } from '../../theme/consts';

export default makeStyles(
  {
    input: {
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: '0.01em',
      fontFamily: 'PTRootUIWebRegular',
      color: '#fff',
      backgroundColor: COLOURS.SURFACE_PRIMARY,
      border: 'none',
      resize: 'none',
      padding: 0,
    },
    sendButton: {
      fontSize: '16px !important',
      lineHeight: '20px !important',
      letterSpacing: '0.01em',
      fontWeight: 500,
      padding: '6px 12px',
    },
  },
  { name: 'MessageInput' },
);
