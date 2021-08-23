import { makeStyles } from '@material-ui/core';

export default makeStyles(
  {
    button: {
      display: 'block',
      fontStyle: 'normal',
      fontWeight: 500,
      textAlign: 'center',
      color: '#fff',
      cursor: 'pointer',
      border: 0,
      letterSpacing: '0.01em',
      backgroundColor: 'transparent',
      '&:hover': {
        background: 'radial-gradient(100% 167.95% at 0% 50%, #00e0ff 0%, #bf51f2 74.27%, #f65fc7 99.99%, #f960c5 100%)',
        boxShadow: '0px 10px 25px 2px #7918aa',
      },
      '&:active': {
        background: 'radial-gradient(100% 167.95% at 0% 50%, #15cae2 0%, #b24ae2 74.27%, #dd50b1 99.99%)',
        boxShadow: '0px 10px 25px 2px #7918aa',
      },
    },
    large: { height: 48, lineHeight: '48px' },
    medium: { fontSize: 14, lineHeight: '18px' },
    small: {
      fontSize: 10,
      fontWeight: 'bold',
      padding: '0 8px',
      height: 24,
      lineHeight: '24px',
      borderRadius: 4,
    },
    contained: {
      borderRadius: 4,
      transition: 'transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out',
      boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
      background: 'linear-gradient(to bottom, #eeeeee 0%, #eeeeee 100%)',
      filter:
        "progid:DXImageTransform.Microsoft.gradient( startColorstr='#eeeeee', endColorstr='#eeeeee',GradientType=0 )",
      textTransform: 'uppercase',
      color: '#000',
      '&:active': { transform: 'translateY(1px)', boxShadow: 'none' },
    },
    outlined: {
      borderRadius: 5,
      border: '1px solid #ffffff',
      fontSize: 13,
      lineHeight: '16px',
      '&:active': { transform: 'translateY(1px)', boxShadow: 'none' },
    },
    text: {},
    fullWidth: { width: '100%' },
    submit: {
      background: 'radial-gradient(100% 167.95% at 0% 50%, #00e0ff 0%, #bf51f2 74.27%, #f65fc7 99.99%, #f960c5 100%)',
      boxShadow: '0px 10px 25px 2px rgba(0, 0, 0, 0.15)',
      borderRadius: 10,
      fontSize: 14,
      lineHeight: '18px',
      '&[disabled]': {
        background: 'transparent',
        color: 'grey',
        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1)',
      },
    },
  },
  { name: 'Button' },
);
