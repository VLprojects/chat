import React, { FC } from 'react';
import useStyles from './styles';

interface Props {
  children: JSX.Element;
}

const ChatFooter: FC<Props> = (props) => {
  const { children } = props;
  const classes = useStyles();

  return <div className={classes.footer}>{children}</div>;
};

export default ChatFooter;
