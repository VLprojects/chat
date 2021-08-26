import { makeStyles } from '@material-ui/core';
import { COLOURS } from '../../theme/consts';

export default makeStyles(
  {
    channelsList: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    channelRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 16px',
      '&:hover': { backgroundColor: '#353a41', cursor: 'pointer' },
    },
    channelTitle: {
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '20px',
      letterSpacing: '0.01em',
      color: '#fff',
    },
    counter: {
      verticalAlign: 'middle',
      textAlign: 'center',
      width: '24px',
      height: '24px',
      boxShadow: `0px 0px 25px 2px ${COLOURS.SURFACE_SECONDARY2}`,
      borderRadius: '10px',
      position: 'relative',
      border: `1px solid ${COLOURS.SURFACE_SECONDARY2}`,
      color: '#fff',
      fontSize: '14px',
      lineHeight: '18px',
      letterSpacing: '0.01em',
      paddingTop: '2px',
    },
  },
  { name: 'ChannelList' },
);
