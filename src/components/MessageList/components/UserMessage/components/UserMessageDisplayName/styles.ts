import { makeStyles } from '@mui/styles';

export default makeStyles(
  {
    link: {
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
    },
  },
  {
    name: 'UserMessageDisplayName',
  },
);
