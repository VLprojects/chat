import React, { FC } from 'react';

import styles from './WineLoader.module.scss';

const WineLoader: FC = () => (
  <div className={styles.wineLoader}>
    <ul>
      <li />
      <li />
      <li />
    </ul>
    <div className={[styles.wineglass, styles.left].join(' ')}>
      <div className={styles.top} />
    </div>
    <div className={[styles.wineglass, styles.right].join(' ')}>
      <div className={styles.top} />
    </div>
  </div>
);

export default WineLoader;
