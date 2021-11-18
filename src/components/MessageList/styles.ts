import { makeStyles } from '@mui/styles';

export default makeStyles(
  {
    messages: {
      flexGrow: 1,
    },
    message: {
      padding: '6px 12px',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
    },
    messageContainer: {
      padding: '0 12px',
    },
  },
  { name: 'MessageList' },
);
