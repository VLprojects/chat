import { makeStyles } from '@material-ui/core';
import { COLOURS } from '../../theme/consts';

export default makeStyles(
  {
    pageWrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    avatarGroup: {
      width: 25,
      height: 25,
      fontSize: 13,
      color: COLOURS.TEXT_PRIMARY,
      lineHeight: '18px',
      letterSpacing: '0.01em',
    },
    footer: {
      padding: '14px 16px',
      border: '1px solid #DEE3E7',
      borderRadius: '15px 15px 0px 0px',
    },
  },
  { name: 'ChannelsId' },
);
