import { makeStyles } from '@mui/styles';

export default makeStyles({
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  // если где то повторится надо будет для инпута делать variant и переносить туда.
  textInput: {
    border: '1px solid #B8B6C2',
    borderRadius: 10,
    padding: '14px 16px',
    width: '100%',
  },
});
