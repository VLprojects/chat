import { makeStyles } from '@mui/styles';
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
      transition: 'all 0.1s ease-in-out',
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
      color: COLOURS.BLACK_01,
      boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.15)',
      '&:hover': {
        color: COLOURS.BLACK_01,
      },
      '&:active': { transform: 'translateY(1px)', boxShadow: 'none' },
    },
    flatTransparent: {
      borderRadius: 10,
      border: '1px solid #B8B6C2',
      color: COLOURS.BLACK_01,
      '&:hover': {},
      '&:active': {},
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
      '&:hover': {
        background: 'radial-gradient(100% 167.95% at 0% 50%, #535FC4 0%, #535FC4 0.01%, #7D40C8 52.98%, #A836AF 100%);',
        boxShadow: '0px 2px 14px 2px #7918AA',
      },
      '&:active': {
        background: 'radial-gradient(100% 167.95% at 0% 50%, #535FC4 0%, #535FC4 0.01%, #7D40C8 52.98%, #A836AF 100%);',
        boxShadow: '0px 2px 14px 2px #7918AA',
      },
      '&[disabled]': {
        background: COLOURS.SURFACE_SECONDARY,
        color: COLOURS.POLL_TEXT_SECONDARY,
        boxShadow: 'none',
      },
    },
    link: {
      color: COLOURS.BLACK_01,
      background: 'none',
      border: 0,
      padding: 0,

      '&:hover, &:focus, &:active, &:active:focus': {
        color: COLOURS.BLACK_01,
      },

      '&:disabled': {
        color: COLOURS.BLACK_03,
      },
    },
    active: {
      borderRadius: 10,
      backgroundColor: COLOURS.ACTIVE,
      '&:hover': {
        backgroundColor: COLOURS.BLUE,
      },
      '&:active': { transform: 'translateY(1px)', boxShadow: 'none' },
    },
  },
  { name: 'Button' },
);
