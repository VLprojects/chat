import React from 'react';

import styles from './Checkbox.module.scss';

const Checkbox = () => (
  <div className={styles.checkbox}>
    <label>
      <input type="checkbox" name="checkbox" value="" />
      <div />
    </label>
  </div>
);

export default Checkbox;
