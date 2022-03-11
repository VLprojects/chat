import { makeStyles } from '@mui/styles';
import { BREAKPOINTS } from 'theme/consts';

const pollMaxWidth = 432;

export default makeStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: pollMaxWidth,
      minHeight: 220,
      position: 'absolute',
      left: 20,
      bottom: 20,
      backgroundColor: '#fff',
      boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.15)',
      borderRadius: 10,
      padding: 24,
      zIndex: 999999,
    },
    [`@media (max-width:${BREAKPOINTS.SM}px)`]: {
      root: {
        left: 0,
        right: 0,
        bottom: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 'auto',
        maxWidth: pollMaxWidth,
        padding: `calc(100% / 48)`,
      },
    },
  },
  { name: 'PollPortal' },
);
