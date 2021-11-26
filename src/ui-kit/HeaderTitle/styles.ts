import { makeStyles } from '@mui/styles';
import { COLOURS } from 'theme/consts';

export default makeStyles({
  root: {
    fontFamily: 'PTRootUIWebMedium',
  },
  active: {
    backgroundColor: COLOURS.BG_FOR_SLOT,
    padding: '8px 16px',
    borderRadius: 37,
  },
});
