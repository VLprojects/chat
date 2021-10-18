import { makeStyles } from '@material-ui/core';
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
