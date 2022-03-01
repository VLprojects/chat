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

    input {
      padding: 0;
      ::placeholder {
        opacity: 1;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 16px;
        letter-spacing: 0.01em;
      }
    }

    textarea {
      font-size: 16px;
      line-height: 20px;
      letter-spacing: 0.01em;
      font-family: 'PTRootUIWebRegular';
      border: none;
      resize: none;
      padding: 0;
      width: 100%;
      ::placeholder {
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 0.01em;
      }
      :disabled {
        background-color: inherit;
      }
      -ms-overflow-style: none;
      scrollbar-width: none;
      overflow-y: scroll;
      ::-webkit-scrollbar {
        display: none;
      }
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
