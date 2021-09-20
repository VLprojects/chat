import { makeStyles } from '@material-ui/core';

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
    large: { height: 48, lineHeight: '48px', padding: '0 0 0 8px' },
    outlined: {
      border: '1px solid #b8b6c2',
      borderRadius: 5,
    },
    text: {},
    medium: {},
  },
  { name: 'Input' },
);
