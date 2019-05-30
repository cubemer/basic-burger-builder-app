import React from 'react';

import styles from './Order.module.css'

const order = (props) => (
  <div className={styles.Order}>
    <p>Ingredients: Lettuce (1)</p>
    <p>Price: <strong>USD 6.50</strong></p>
  </div>
)

export default order;