import { makeStyles } from '@mui/styles';
import { COLOURS } from '../../theme/consts';

export default makeStyles(
  {
    root: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
    },
    content: {
      zIndex: 1000,
      background: COLOURS.SURFACE_PRIMARY,
      padding: 20,
      borderRadius: '20px 20px 0px 0px',
    },
    background: {
      background: 'black',
      width: '100%',
      height: '100%',
      position: 'absolute',
      opacity: '.1',
    },
    cancelButton: {
      width: 32,
      height: 34,
      backgroundColor: COLOURS.WHITE,
      borderRadius: 10,
      marginLeft: 16,
      marginBottom: 12,
    },
  },
  { name: 'Drawer' },
);
