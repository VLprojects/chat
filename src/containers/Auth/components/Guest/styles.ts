import { makeStyles } from '@mui/styles';

export default makeStyles(
  {
    container: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 16,
      paddingRight: 16,
      height: '100%',
      justifyContent: 'center',
    },
    field: {
      marginTop: 24,
      marginBottom: 21,
      '&:nth-of-type(2)': {
        marginBottom: 20,
      },
    },
    fieldLabel: {
      marginBottom: 4,
    },
    footer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '&>*': {
        marginBottom: 24,
      },
    },
  },
  { name: 'Guest' },
);
