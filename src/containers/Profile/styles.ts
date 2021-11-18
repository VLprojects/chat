import { makeStyles } from '@mui/styles';

export default makeStyles(
  {
    container: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      padding: '24px',
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
