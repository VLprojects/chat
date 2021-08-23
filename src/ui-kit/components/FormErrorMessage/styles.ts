import { makeStyles } from '@material-ui/core';

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
