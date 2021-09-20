import { makeStyles } from '@material-ui/core';
import { COLOURS, SUBHEADER_HEIGHT } from '../../theme/consts';

export default makeStyles(
  {
    subHeader: {
      height: SUBHEADER_HEIGHT,
      lineHeight: '52px',
      background: COLOURS.SURFACE_PRIMARY,
      boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.15)',
      borderRadius: '0px 0px 10px 10px',
      display: 'flex',
      position: 'relative',
    },
    btnBack: {
      border: 0,
      backgroundColor: 'transparent',
      padding: '0 28px',
      position: 'absolute',
      left: '0',
      height: 52,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      flex: 1,
      textAlign: 'center',
      padding: '0 64px',
      display: 'flex',
      alignItems: 'center',
      minHeight: SUBHEADER_HEIGHT,
    },
  },
  { name: 'SubHeader' },
);
