import { makeStyles } from '@material-ui/core';
import { COLOURS, fontRegular14LineHeight17, fontRegular14LineHeight18 } from 'theme/consts';

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
    header: {
      fontWeight: 'bold',
    },
    field: {
      marginBottom: 21,
      '&:nth-of-type(2)': {
        marginBottom: 20,
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
    formLabel: {
      ...fontRegular14LineHeight18,
      marginTop: 10,
      marginBottom: 15,
      '& > a': {
        color: COLOURS.LINK_PRIMARY,
      },
    },
    fontRegular14LineHeight18,
  },
  { name: 'Signup' },
);
