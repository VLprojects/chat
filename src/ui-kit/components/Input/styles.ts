import { makeStyles } from '@mui/styles';
import { COLOURS } from 'theme/consts';

export default makeStyles(
  {
    input: {
      fontSize: 16,
      lineHeight: '20px',
      border: 0,
      backgroundColor: 'transparent',
      outline: 'none',
    },
    fullWidth: { width: '100%' },
    large: { height: 40, lineHeight: '48px', padding: '12px 16px' },
    outlined: {
      border: `1px solid ${COLOURS.LIGHT_03}`,
      borderRadius: 10,
    },
    text: {},
    medium: {},
  },
  { name: 'Input' },
);
