import { makeStyles } from '@material-ui/core';
import { SUBHEADER_HEIGHT } from '../../../../theme/consts';

export default makeStyles(
  {
    root: {
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'center',
      height: SUBHEADER_HEIGHT,
      boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.15)',
      width: '100%',
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
