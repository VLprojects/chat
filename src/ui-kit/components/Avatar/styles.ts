import { makeStyles } from '@mui/styles';
import { IProps, Size } from './Avatar';

export default makeStyles(
  {
    avatar: {
      width: (props: IProps) => Size[props.size],
      height: (props: IProps) => Size[props.size],
      cursor: 'pointer',
      fontSize: 16,
    },
  },
  { name: 'Avatar' },
);
