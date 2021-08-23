import { makeStyles } from '@material-ui/core';

export default makeStyles(
  {
    messages: {
      flexGrow: 1,
    },
    scrollbars: { '& > div': { display: 'flex', flexDirection: 'column' } },
    messagesListWrapper: { width: '100%', padding: '0 12px' },
  },
  { name: 'MessageList' },
);
