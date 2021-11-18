import { makeStyles } from '@mui/styles';

export default makeStyles(
  {
    error: {
      marginBottom: 20,
      '&> div': {
        display: 'inline-block',
        padding: '4px 8px',
        backgroundColor: 'red',
        color: '#fff',
        borderRadius: 4,
      },
    },
  },
  { name: 'FormErrorMessage' },
);
