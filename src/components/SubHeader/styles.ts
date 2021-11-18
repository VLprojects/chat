import { makeStyles } from '@mui/styles';
import { COLOURS, HEADER_HEIGHT } from '../../theme/consts';

export default makeStyles(
  {
    header: {
      height: HEADER_HEIGHT,
      display: 'flex',
      position: 'relative',
      borderBottom: `1px solid ${COLOURS.LIGHT_01}`,
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
    },
  },
  { name: 'SubHeader' },
);
