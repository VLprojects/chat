import React, { FC, Fragment, memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from '../../../../ui-kit';
import useStyles from './styles';

interface IFooter {
  text: string;
  onClick: () => void;
}

interface IProps {
  buttonText: string;
  onClickButton: () => void;
  footerActions?: IFooter[];
}

const ActionBlock: FC<IProps> = (props) => {
  const { buttonText, onClickButton, footerActions } = props;
  const classes = useStyles();

  return (
    <>
      <Button variant="submit" fullWidth size="large" onClick={onClickButton}>
        {buttonText}
      </Button>

      <div className={classes.footerActions}>
        {footerActions?.map((action, index) => (
          <Fragment key={index}>
            <a href="#" onClick={action.onClick}>
              {action.text}
            </a>
            {index + 1 !== footerActions.length && (
              <span>
                {' '}
                <FormattedMessage id="or" />{' '}
              </span>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default memo(ActionBlock);
