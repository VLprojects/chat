import { makeStyles } from '@mui/styles';
import { COLOURS, HEADER_HEIGHT } from '../../theme/consts';

export default makeStyles(
  {
    header: {
      height: HEADER_HEIGHT,
      display: 'flex',
      position: 'relative',
      borderBottom: `1px solid ${COLOURS.LIGHT_01}`,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      zIndex: 9999,
    },
  },
  { name: 'SubHeader' },
);
