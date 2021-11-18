import { createTheme } from '@mui/material/styles';
import { COLOURS } from './consts';
import MuiCssBaseline from './muicssbaseline';

const palette = {
  text: {
    primary: COLOURS.BLACK_01,
    secondary: COLOURS.BLACK_03,
    white: COLOURS.WHITE,
    black: COLOURS.BLACK,

    pollPrimary: COLOURS.POLL_TEXT_PRIMARY,
    pollSecondary: COLOURS.POLL_TEXT_SECONDARY,
  },
};

const typography = {
  fontFamily: 'PTRootUIWebMedium',
  h1: {
    fontFamily: 'PTRootUIWebBold',
    fontSize: 40,
    lineHeight: '50px',
    letterSpacing: '0.01em',
    margin: 0,
  },
  h2: {
    fontFamily: 'PTRootUIWebBold',
    fontSize: 22,
    lineHeight: '28px',
    fontWeight: 700,
  },
  h4: {
    fontFamily: 'PTRootUIWebBold',
    fontSize: 16,
    lineHeight: '20px',
  },
  body1: {
    fontSize: 16,
    lineHeight: '20px',
  },
  body2: {
    fontSize: 14,
    lineHeight: '18px',
  },
  subtitle1: {
    fontFamily: 'PTRootUIWebBold',
    fontSize: 14,
  },
  subtitle2: {
    fontSize: 13,
    lineHeight: '16px',
  },
};
const themeOptions = {
  palette,
  typography,
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: COLOURS.BLACK_03,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: 'unset',
          },
        },
      },
    },
    MuiCssBaseline,
  },
};

export default createTheme(themeOptions);
