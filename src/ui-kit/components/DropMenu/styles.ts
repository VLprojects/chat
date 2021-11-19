import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { COLOURS } from 'theme/consts';

const minWidth = 130;

const ICON_SIZE = {
  XS: 15,
};

export default makeStyles((theme: Theme) => ({
  paper: {
    borderRadius: 10,
    overflow: 'auto',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.07)',
    '& ul': {
      padding: 0,
      width: 'fit-content!important',
      minWidth,
    },
  },
  menuItem: {
    fontSize: 13,
    lineHeight: '15px',
    color: COLOURS.BLACK_01,
  },
  icon: {
    color: theme.palette.grey[400],
    marginRight: 12,
    fontSize: ICON_SIZE.XS,
  },
}));
