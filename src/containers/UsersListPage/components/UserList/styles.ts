import { makeStyles } from '@mui/styles';

export default makeStyles(
  {
    root: {
      padding: '20px 0px',
    },
    // usersList: {
    //   flex: 1,

    //   display: 'flex',
    //   flexDirection: 'column',
    // },
    inputSearch: {
      border: '1px solid #B8B6C2',
      borderRadius: '5px',
      height: '48px',
      lineHeight: '48px',
      padding: '0 0 0 8px',
      margin: '0 16px 23px',
      display: 'flex',
      input: { flex: 1 },
      button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 8px',
      },
      '& > input': {
        width: '100%',
      },
      '& > button': {
        backgroundColor: 'inherit',
        border: 'none',
      },
    },
    userCounter: {
      display: 'flex',
      marginBottom: 15,
      padding: '0 16px',
    },
    userListWrapper: {
      overflow: 'auto',
    },
  },
  { name: 'UserList' },
);
