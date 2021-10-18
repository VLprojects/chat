import { makeStyles } from '@material-ui/core';
import { COLOURS } from '../../../../theme/consts';

export default makeStyles({
  root: {
    marginBottom: 24,
    borderRadius: 10,
    boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.15)',
  },
  moreAction: { color: 'white', backgroundColor: COLOURS.TEXT_PRIMARY, borderRadius: 4, fill: 'white' },
});
