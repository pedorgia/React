import styles from './styles.module.scss';
import React from 'react';

export const ProductSummary = ({ symbol, taxes, totalCount, totalPrice }) => {
  return (
    <>
      <div className={styles.summary_str}>
        <div>Taxes:</div>
        <div>
          {symbol}
          {taxes}
        </div>
      </div>
      <div className={styles.summary_str}>
        <div>Quantity:</div>
        <div>{totalCount}</div>
      </div>
      <div className={styles.summary_str}>
        <div>Total:</div>
        <div>
          {symbol}
          {totalPrice}
        </div>
      </div>
      {totalCount === 0 ? (
        <button className={`${styles.summary_btn} ${styles.disabled}`}>
          Order
        </button>
      ) : (
        <button
          className={styles.summary_btn}
          onClick={() => alert('You ordered! Thank you!')}
        >
          Order
        </button>
      )}
    </>
  );
};
