import PTRootBoldWoff2 from './fonts/PT-Root-UI_Bold.woff2';
import PTRootMediumWoff2 from './fonts/PT-Root-UI_Medium.woff2';
import PTRootRegularWoff2 from './fonts/PT-Root-UI_Regular.woff2';

export default {
  styleOverrides: `
    @font-face {
      font-family: 'PTRootUIWebMedium';
      src: local('Raleway'),local('Raleway-Regular'),url(${PTRootMediumWoff2}) format('woff2');
    }
    @font-face {
      font-family: 'PTRootUIWebRegular';
      src:
        local('Raleway'),
        local('Raleway-Regular'),
        url(${PTRootRegularWoff2}) format('woff2');
    }
    @font-face {
      font-family: 'PTRootUIWebBold';
    src:
      local('Raleway'),
      local('Raleway-Regular'),
      url(${PTRootBoldWoff2}) format('woff2');
    }

    a {
      color: inherit
    }

    html {
      letter-spacing: 0.01em;
      * {
        box-sizing: border-box;
      }
      *:after { box-sizing: border-box };
      *:before { box-sizing: border-box };
      *:focus {
        outline: none;
      }
    }



    /* Works on Firefox */
    * {
      scrollbar-width: thin;
      scrollbar-color: #fff #DEE3E7;
    }

    /* Works on Chrome, Edge, and Safari */
    *::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    *::-webkit-scrollbar-track {
      background: #fff;
    }

    *::-webkit-scrollbar-thumb {
      background-color: #DEE3E7;
      border-radius: 50px;

    }
  `,
};
