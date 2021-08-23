import { makeStyles } from '@material-ui/core';
import { COLOURS } from '../../../theme/consts';

export default makeStyles(
  {
    message: {
      padding: '6px 12px',
      fontFamily: 'PTRootUIWebRegular',
      color: '#fff',
      fontSize: 16,
      fontWeight: 'normal',
      lineHeight: '20px',
      letterSpacing: '0.01em',
      backgroundColor: COLOURS.SURFACE_PRIMARY,
      borderRadius: 10,
      marginBottom: 24,
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
    },
    system: {
      borderRadius: 5,
      letterSpacing: '0.01em',
      textAlign: 'center',
      width: '100%',
    },
    messageInfo: { display: 'flex', alignItems: 'center' },
    messageInfoOwn: { flexDirection: 'row-reverse' },
    displayName: {
      color: '#fff',
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: '18px',
      letterSpacing: '0.01em',
      marginLeft: 8,
      marginRight: 12,
    },
    time: {
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: '18px',
      letterSpacing: '0.01em',
      color: COLOURS.TEXT_SECONDARY3,
    },
    userMessage: { marginLeft: 24, maxWidth: '80%' },
    userMessageOwn: {
      marginLeft: 0,
      marginRight: 24,
      marginBottom: 8,
    },
    isNew: {},
  },

  { name: 'Message' },
);
