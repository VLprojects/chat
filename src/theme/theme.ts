import { createTheme } from '@mui/material/styles';
import { COLOURS, zINDEX } from './consts';
import MuiCssBaseline from './muicssbaseline';

const palette = {
  text: {
    primary: COLOURS.BLACK_01,
    black02: COLOURS.BLACK_02,
    secondary: COLOURS.BLACK_03,
    light02: COLOURS.LIGHT_02,
    secondary6: COLOURS.BLACK_06,
    white: COLOURS.WHITE,
    black: COLOURS.BLACK,
    pollPrimary: COLOURS.POLL_TEXT_PRIMARY,
    pollSecondary: COLOURS.POLL_TEXT_SECONDARY,
    error: COLOURS.ERROR,
  },
  primary: {
    main: '#535FC4',
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
  h3: {
    fontFamily: 'PTRootUIWebBold',
    fontSize: 18,
    lineHeight: '20px',
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
  spacing: 4,
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          color: COLOURS.BLACK_01,
          '&.Mui-focused': {
            color: COLOURS.BLACK_01,
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
    MuiTooltip: {
      styleOverrides: {
        popper: {
          zIndex: zINDEX.TOOLTIP_POPPER,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 10,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          padding: 0,
          fontSize: '15px',
          lineHeight: '19px',
          color: COLOURS.BLACK_01,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          overflow: 'visible',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          wordBreak: 'break-all' as const,
          padding: 0,
          marginBottom: 12,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 0,
          '&:last-child': { paddingBottom: 0 },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          boxShadow: 'none!important',
        },
      },
    },
    MuiCssBaseline,
  },
};

export default createTheme(themeOptions);
