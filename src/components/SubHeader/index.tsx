import React, { FC } from 'react';
import { Image } from 'ui-kit';
import IconBack from 'ui-kit/assets/icons/icon-back.svg';
import styles from './SubHeader.module.scss';

interface ISubHeader {
  onBack?: () => void;
  rightButton?: any;
}

const SubHeader: FC<ISubHeader> = (props) => {
  const { children, onBack, rightButton = <></> } = props;

  return (
    <div className={styles.subHeader}>
      {onBack && (
        <button className={styles.btnBack} type="button" onClick={onBack}>
          <Image src={IconBack} alt="" />
        </button>
      )}
      <div className={styles.title}>{children}</div>
      {rightButton}
    </div>
  );
};

export default SubHeader;
