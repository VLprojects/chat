import { makeStyles } from '@material-ui/core';
import { COLOURS } from '../../../theme/consts';

export default makeStyles(
  {
    avatar: {
      width: 24,
      minWidth: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: COLOURS.SURFACE_PRIMARY,
      border: '1px solid #303339',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      color: '#fff',
      fontSize: 11,
      lineHeight: '14px',
      fontWeight: 500,
      img: { maxWidth: '100%' },
    },
    large: {
      width: 32,
      height: 32,
      borderRadius: 16,
    },
  },
  { name: 'Avatar' },
);
