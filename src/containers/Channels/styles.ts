import { makeStyles } from '@mui/styles';
import { COLOURS } from 'theme/consts';

export default makeStyles(
  {
    btn: {
      cursor: 'pointer',
    },
    btnActive: {
      padding: '8px 16px',
      backgroundColor: COLOURS.BG_FOR_SLOT,
      borderRadius: 37,
    },
    btnCreate: {
      border: 0,
      background: '#fff',
      color: '#000',
      height: 46,
      lineHeight: '46px',
      textAlign: 'center',
      display: 'block',
      boxShadow: '0px 4px 16px rgba(255, 255, 255, 0.6), 0px 2px 2px rgba(255, 255, 255, 0.5)',
      borderRadius: 5,
      padding: 0,
      margin: '24px 16px',
      fontWeight: 500,
    },
  },
  { name: 'Channels' },
);
