import { makeStyles } from '@material-ui/core';
import { COLOURS, HEADER_HEIGHT, zINDEX } from '../../theme/consts';

export default makeStyles({
  header: {
    display: 'flex',
    background: COLOURS.SURFACE_PRIMARY,
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.4)',
    height: `${HEADER_HEIGHT}px`,
    alignItems: 'center',
    zIndex: zINDEX.HEADER,
  },
  buttonClose: {
    marginRight: 24,
    cursor: 'pointer',
    fontSize: 16,
    color: COLOURS.TEXT_SECONDARY2,
    background: 'inherit',
    border: 'none',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: '19px',
    color: '#fff',
  },
  icon: {
    marginLeft: 24,
    cursor: 'pointer',
  },
  profileIcon: {
    marginRight: 24,
    cursor: 'pointer',
  },
});
