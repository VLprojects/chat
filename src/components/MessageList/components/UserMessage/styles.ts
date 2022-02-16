import { makeStyles } from '@mui/styles';
import User from 'keystone/chat/user';
import { COLOURS } from '../../../../theme/consts';

export default makeStyles(
  {
    otherUserMessage: {
      backgroundColor: '#F6F6F9',
      marginLeft: 40, // +list padding
    },
    ownMessage: {
      backgroundColor: (props: { user?: User }) => COLOURS[props?.user?.getAvatarColor || 'AVATAR2_RED'],
      color: COLOURS.WHITE,
      marginRight: 35, // +list padding
    },
    message: {
      padding: '6px 12px',
      borderRadius: 10,
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      wordBreak: 'break-word',
    },
    tooltip: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      borderRadius: 'none',
      marginLeft: '-10px!important',
      marginRight: '-5px!important',
      maxWidth: 'none',
    },
    icon: {
      '& :hover': {
        fill: 'red',
      },
    },
  },

  { name: 'Message' },
);
