import { makeStyles } from '@material-ui/core';
import { COLOURS, fontRegular14LineHeight18 } from 'theme/consts';

export default makeStyles(
  {
    footerActions: {
      ...fontRegular14LineHeight18,
      '& > a': {
        color: COLOURS.LINK_PRIMARY,
      },
    },
  },
  { name: 'ActionBlock' },
);
