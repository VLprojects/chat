import { makeStyles } from '@mui/styles';
import { COLOURS } from 'theme/consts';

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
    formLabel: {
      marginTop: 10,
      marginBottom: 24,
      '& > a': {
        marginLeft: 4,
        color: COLOURS.BLUE,
      },
    },
  },
  { name: 'Signin' },
);
