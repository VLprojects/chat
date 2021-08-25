import { makeStyles } from '@material-ui/core';

export default makeStyles({
  row: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 15px 12px',
    '& > *': {
      marginRight: 12,
    },
    '&:hover': { backgroundColor: '#353a41', cursor: 'pointer' },
  },
  channelTitle: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '20px',
  },
});
