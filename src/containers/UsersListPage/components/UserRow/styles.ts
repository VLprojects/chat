import { makeStyles } from '@material-ui/core';

export default makeStyles(
  {
    userRow: {
      padding: '12px 16px',
      '&:hover': {
        boxShadow: '0px 10px 25px 2px rgba(0, 0, 0, 0.15)',
        borderRadius: 10,
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
