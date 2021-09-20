import { makeStyles } from '@material-ui/core';
import { COLOURS } from '../../../theme/consts';

export default makeStyles(
  {
    message: {
      padding: '6px 12px',
      backgroundColor: COLOURS.SURFACE_SECONDARY,
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
    displayName: {
      marginLeft: 8,
      marginRight: 12,
    },
    time: {
      color: COLOURS.TEXT_SECONDARY2,
    },
    userMessage: { maxWidth: '80%' },
    userMessageOwn: {
      marginLeft: 0,
      marginRight: 24,
      marginBottom: 8,
    },
    isNew: {},
  },

  { name: 'Message' },
);
