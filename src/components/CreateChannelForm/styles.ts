import { makeStyles } from '@material-ui/core';
import { COLOURS } from '../../theme/consts';

export default makeStyles(
  {
    createChannelForm: {
      position: 'absolute',
      zIndex: 10,
      left: '0',
      right: '0',
      bottom: '0',
    },
    wrapper: {
      width: '100%',
      padding: '20px',
      boxSizing: 'border-box',
      animationDuration: '.2s',
      animationName: 'slidein',
      backgroundColor: COLOURS.SURFACE_PRIMARY,
      boxShadow: 'var(--shadow-main-totop)',
    },
    closeButton: {
      width: '42px',
      height: '42px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#aaa',
      position: 'absolute',
      zIndex: 1,
      right: '10px',
      top: '10px',
      transition: 'color .2s ease-in-out',
      '&:hover': { color: 'var(--color-white)' },
    },
    field: {
      margin: '0 0 40px',
    },
    input: {
      border: '1px solid rgba(255,255,255,.2)',
      boxSizing: 'border-box',
      borderRadius: '5px',
      padding: '0 12px',
      height: '48px',
      lineHeight: '48px',
      transition: 'border .2s ease-in-out',
      '&:hover, &:focus': { borderColor: 'rgba(255,255,255,.5)' },
    },
    '@keyframes slidein': {
      from: { transform: 'translateY(100%)', height: '80%' },
      to: { transform: 'translateY(0)', height: '100%' },
    },
  },
  { name: 'CreateChannelForm' },
);
