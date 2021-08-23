import React, { FC } from 'react';
import { Image } from 'ui-kit';
import IconBack from 'ui-kit/assets/icons/icon-back.svg';
import useStyles from './styles';

interface ISubHeader {
  onBack?: () => void;
  rightButton?: JSX.Element;
}

const SubHeader: FC<ISubHeader> = (props) => {
  const { children, onBack, rightButton = <></> } = props;
  const classes = useStyles();

  return (
    <div className={classes.subHeader}>
      {onBack && (
        <button className={classes.btnBack} type="button" onClick={onBack}>
          <Image src={IconBack} alt="" />
        </button>
      )}
      <div className={classes.title}>{children}</div>
      {rightButton}
    </div>
  );
};

export default SubHeader;
