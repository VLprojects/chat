import { makeStyles } from '@material-ui/core';

export default makeStyles(
  {
    subheader: {
      display: 'flex',
      height: '100%',
    },
    btn: {
      border: 0,
      backgroundColor: 'transparent',
      color: '#9a9a9a',
      textAlign: 'center',
      flex: 1,
      display: 'block',
      height: '100%',
      fontWeight: 500,
      fontSize: 16,
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
