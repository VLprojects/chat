import { makeStyles } from '@material-ui/core';
import { COLOURS } from '../../theme/consts';

export default makeStyles(
  {
    pageWrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    userList: {
      position: 'absolute',
      right: 0,
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      textDecoration: 'none',
      '& > div': { marginLeft: -10 },
    },
    circle: {
      width: 32,
      minWidth: 32,
      height: 32,
      borderRadius: '50%',
      backgroundColor: COLOURS.SURFACE_PRIMARY,
      border: '1px solid #303339',
      color: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    chatNameTitle: {
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '20px',
      textAlign: 'center',
      color: '#fff',
    },
    subHeaderWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: COLOURS.SURFACE_SECONDARY3,
      paddingTop: 15,
      paddingLeft: 28,
      paddingBottom: 13,
      boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.4)',
      borderRadius: '0px 0px 15px 15px',
    },
    avatarWrapper: {
      marginRight: '10px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      '& > div:not(:first-child)': { marginLeft: -8 },
    },
    subHeaderBack: { cursor: 'pointer' },
    footer: {
      padding: '14px 16px',
      background: COLOURS.SURFACE_PRIMARY,
      borderRadius: '15px 15px 0px 0px',
    },
  },
  { name: 'ChannelsId' },
);
