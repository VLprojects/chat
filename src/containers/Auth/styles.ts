import { makeStyles } from '@material-ui/core';
import { fontRegular14LineHeight17 } from 'theme/consts';

export default makeStyles(
  {
    container: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: 16,
      paddingRight: 16,
      height: '100%',
      background: 'white',
      justifyContent: 'flex-end',
    },
    header: {
      fontWeight: 'bold',
    },
    field: {
      marginBottom: 21,
      '&:nth-of-type(2)': {
        marginBottom: 33,
      },
    },
    fieldLabel: {
      marginBottom: 4,
      ...fontRegular14LineHeight17,
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
  { name: 'Auth' },
);
