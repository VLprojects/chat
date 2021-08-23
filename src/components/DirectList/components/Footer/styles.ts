import { makeStyles } from '@material-ui/core';
import { COLOURS, SUBHEADER_HEIGHT } from '../../../../theme/consts';

export default makeStyles(
  {
    root: {
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'center',
      height: SUBHEADER_HEIGHT,
      background: COLOURS.SURFACE_SECONDARY4,
    },
    buttonWrapper: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      cursor: 'pointer',
      '& > *': {
        marginRight: 13,
      },
      '&:first-of-type': {
        marginRight: 82,
      },
    },
  },
  { name: 'Footer' },
);
