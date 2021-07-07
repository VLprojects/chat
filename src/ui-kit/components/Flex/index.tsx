import React, { FC } from 'react';

import styles from './Flex.module.scss';

interface IFlex {
  children: string | JSX.Element | JSX.Element[];
  row?: boolean;
  className?: string;
}

const Flex: FC<IFlex> = (props) => {
  const { children, row = false, className } = props;
  const cn = [styles.flex, className];

  if (row) {
    cn.push(styles.row);
  }

  return (
    <div className={cn.join(' ')}>{children}</div>
  );
};

export default Flex;
