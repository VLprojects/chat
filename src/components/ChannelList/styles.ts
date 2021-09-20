import { makeStyles } from '@material-ui/core';

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
      cursor: 'pointer',
      '&:hover': {
        boxShadow: '0px 10px 25px 2px rgba(0, 0, 0, 0.15)',
        borderRadius: 10,
      },
    },

    counter: {
      verticalAlign: 'middle',
      textAlign: 'center',
      width: '24px',
      height: '24px',
      position: 'relative',
      color: '#fff',
      fontSize: '14px',
      lineHeight: '18px',
      letterSpacing: '0.01em',
      paddingTop: '2px',
      background: 'radial-gradient(100% 167.95% at 0% 50%, #535FC4 0%, #7D40C8 52.98%, #A836AF 100%)',
      borderRadius: 10,
    },
  },

  { name: 'ChannelList' },
);
