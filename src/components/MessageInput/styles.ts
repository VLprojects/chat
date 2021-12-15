import { makeStyles } from '@mui/styles';
import { COLOURS } from 'theme/consts';

export default makeStyles(
  {
    root: {
      width: '100%',
      overflow: 'auto',
      padding: '14px 16px',
      borderTop: `1px solid ${COLOURS.LIGHT_01}`,
      background: COLOURS.WHITE,
      zIndex: 1200,
    },
  },
  { name: 'MessageInput' },
);
