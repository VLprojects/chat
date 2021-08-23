import { createTheme } from '@material-ui/core';
import createPalette from '@material-ui/core/styles/createPalette';
import { COLOURS } from './consts';
import PTRootBoldWoff2 from './fonts/PT-Root-UI_Bold.woff2';
import PTRootMediumWoff2 from './fonts/PT-Root-UI_Medium.woff2';
import PTRootRegularWoff2 from './fonts/PT-Root-UI_Regular.woff2';

const ptroot = {
  fontFamily: 'PTRootUIWebMedium',
  src: `
    local('Raleway'),
    local('Raleway-Regular'),
    url(${PTRootMediumWoff2}) format('woff2')
  `,
};
const ptrootBold = {
  fontFamily: 'PTRootUIWebBold',
  src: `
    local('Raleway'),
    local('Raleway-Regular'),
    url(${PTRootBoldWoff2}) format('woff2')
  `,
};
const ptrootRegular = {
  fontFamily: 'PTRootUIWebRegular',
  src: `
    local('Raleway'),
    local('Raleway-Regular'),
    url(${PTRootRegularWoff2}) format('woff2')
  `,
};

const palette = createPalette({
  text: {
    primary: COLOURS.TEXT_PRIMARY,
    secondary: COLOURS.TEXT_SECONDARY,
  },
  primary: {
    main: COLOURS.SURFACE_PRIMARY,
  },
  secondary: {
    main: COLOURS.SURFACE_SECONDARY,
  },
});

const typography = {
  fontFamily: 'PTRootUIWebMedium',
};
const themeOptions = {
  palette,
  typography,
  overrides: {
    MuiTypography: {
      h1: {
        fontFamily: 'PTRootUIWebBold',
        fontSize: 40,
        lineHeight: '50px',
        letterSpacing: '0.01em',
        margin: 0,
      },
      body1: {
        fontSize: 14,
        lineHeight: '18px',
      },
    },
    MuiCssBaseline: {
      '@global': {
        '@font-face': [ptroot, ptrootBold, ptrootRegular],
        input: {
          padding: 0,
          '&::placeholder': {
            color: COLOURS.TEXT_SECONDARY,
            opacity: 1,
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 13,
            lineHeight: 16,
            letterSpacing: '0.01em',
          },
        },
        textarea: {
          '&::placeholder': {
            color: COLOURS.TEXT_SECONDARY,
            fontSize: 16,
            letterSpacing: '0.01em',
          },
        },
        html: {
          letterSpacing: '0.01em',
          '& *': {
            boxSizing: 'border-box',
          },
          '&*:after': { boxSizing: 'border-box' },
          '&*:before': { boxSizing: 'border-box' },
          '& *:focus': {
            outline: 'none',
          },
        },
      },
    },
  },
};

export default createTheme(themeOptions);
