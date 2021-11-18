import { makeStyles } from '@mui/styles';
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
      color: COLOURS.BLACK_01,
      lineHeight: '18px',
      letterSpacing: '0.01em',
    },
  },
  { name: 'ChannelsId' },
);
