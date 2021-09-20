import { makeStyles } from '@material-ui/core';
import { COLOURS } from '../../theme/consts';

export default makeStyles(
  {
    row: {
      cursor: 'pointer',
      paddingLeft: '40px !important',
      '& > *': {
        marginRight: 12,
      },
      '&:hover': {
        boxShadow: '0px 10px 25px 2px rgba(0, 0, 0, 0.15)',
        borderRadius: 10,
      },
    },
    channelTitle: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: '20px',
    },
  },
  { name: 'DirectList' },
);
