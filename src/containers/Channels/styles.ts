import { makeStyles } from '@material-ui/core';

export default makeStyles(
  {
    btn: {
      cursor: 'pointer',
    },
    btnActive: {
      color: '#fff',
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
