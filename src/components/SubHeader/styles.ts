import { makeStyles } from '@material-ui/core';
import { COLOURS, SUBHEADER_HEIGHT } from '../../theme/consts';

export default makeStyles(
  {
    subHeader: {
      height: SUBHEADER_HEIGHT,
      lineHeight: '52px',
      background: COLOURS.SURFACE_SECONDARY3,
      boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.4)',
      borderRadius: '0px 0px 15px 15px',
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
    },
  },
  { name: 'SubHeader' },
);
