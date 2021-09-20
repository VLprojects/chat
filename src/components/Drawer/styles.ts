import { makeStyles } from '@material-ui/core';
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
      display: 'flex',
      justifyContent: 'center',
      '& > button': {
        width: 70,
        padding: '6px 70px',
        borderRadius: '15px',
        marginBottom: 30,
        textTransform: 'capitalize',

        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: 2,
          borderRadius: '15px',
          background: 'linear-gradient(to right, #3EB1FB, #F95FC5)',
          '-webkit-mask': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          '-webkit-mask-composite': 'destination-out',
          '-mask-composite': 'exclude',
        },
      },
    },
  },
  { name: 'Drawer' },
);
