import React, { FC, memo } from 'react';
import useStyles from './styles';
import { Button } from '../../../../ui-kit';

interface IActionBlockProps {
  buttonText: string;
  onClickButton: () => void;
  footerActions?: null | IFooter[];
}

interface IFooter {
  text: string;
  onClick: (index: number) => void;
}

const ActionBlock: FC<IActionBlockProps> = (props) => {
  const { buttonText, onClickButton, footerActions } = props;
  const classes = useStyles();

  return (
    <>
      <Button variant="submit" fullWidth size="large" onClick={onClickButton}>
        {buttonText}
      </Button>

      <div className={classes.footerActions}>
        {footerActions?.map(({ text, onClick }, index) => (
          <React.Fragment key={index.toString()}>
            <a href="#" onClick={() => onClick(index)}>
              {text}
            </a>
            {index + 1 !== footerActions?.length && <span> or </span>}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default memo(ActionBlock);
