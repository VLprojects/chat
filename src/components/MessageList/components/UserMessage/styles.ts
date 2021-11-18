import { makeStyles } from '@mui/styles';
import { COLOURS } from '../../../../theme/consts';
import { IProps } from './UserMessage';

export default makeStyles(
  {
    displayName: {
      marginLeft: 8,
      marginRight: 12,
    },
    userMessage: {
      backgroundColor: COLOURS.SURFACE_SECONDARY,
      borderRadius: 10,
      maxWidth: '80%',
      marginTop: 6,
      marginLeft: 40,
      marginBottom: 6,
    },
    userMessageOwn: {
      backgroundColor: (props: IProps) => COLOURS[props.user.avatarColor],
      color: COLOURS.WHITE,
      maxWidth: '80%',
      marginRight: 44,
    },
    isNew: {},
  },

  { name: 'Message' },
);
