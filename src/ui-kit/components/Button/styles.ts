import { makeStyles } from '@material-ui/core';
import { COLOURS } from '../../../theme/consts';

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
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        background: 'radial-gradient(100% 167.95% at 0% 50%, #535FC4 0%, #535FC4 0.01%, #7D40C8 52.98%, #A836AF 100%);',
        boxShadow: '0px 2px 14px 2px #7918AA',
      },
      '&:active': {
        background: 'radial-gradient(100% 167.95% at 0% 50%, #535FC4 0%, #535FC4 0.01%, #7D40C8 52.98%, #A836AF 100%);',
        boxShadow: '0px 2px 14px 2px #7918AA',
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
      borderRadius: 10,
      color: COLOURS.TEXT_PRIMARY,
      boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.15)',
      fontSize: 13,
      lineHeight: '16px',
      '&:hover': {
        color: '#fff',
      },
      '&:active': { transform: 'translateY(1px)', boxShadow: 'none' },
    },
    text: {},
    fullWidth: { width: '100%' },
    submit: {
      background: 'radial-gradient(100% 167.95% at 0% 50%, #535FC4 0%, #7D40C8 52.98%, #A836AF 100%);',
      borderRadius: 10,
      fontSize: 14,
      lineHeight: '18px',
      padding: '6px 12px',
      letterSpacing: '0.01em',
      '&[disabled]': {
        background: '#C4C4C4',
        color: '#9A9A9A',
        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1)',
      },
    },
  },
  { name: 'Button' },
);
