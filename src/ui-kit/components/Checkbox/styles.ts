import { makeStyles } from '@mui/styles';
import { COLOURS } from '../../../theme/consts';

export default makeStyles(
  {
    checkbox: {
      width: 20,
      height: 20,
      border: `2px solid ${COLOURS.BLACK_03}`,
      borderRadius: 4,
    },
    input: {
      position: 'absolute',
      left: -9999,
      width: 1,
      height: 1,
      '&:checked': {
        '&+ div': {
          backgroundImage: 'url(/ui-kit/assets/icons/icon-checkbox.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          border: '0',
        },
      },
    },
  },
  { name: 'Checkbox' },
);
