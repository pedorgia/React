import React, { useContext } from 'react';
import { AppContext } from '../../state/App.context';
import styles from './styles.module.scss';

export const ProductDescription = ({ item, type }) => {
  const { getProductPrice } = useContext(AppContext);

  const brandNameSize = type === 'medium' ? styles.m_brand_name_size : null;
  const priceSize = type === 'medium' ? styles.m_price_size : null;

  return (
    <>
      <p className={`${styles.brand} ${brandNameSize}`}>{item.brand}</p>
      <p className={`${styles.name} ${brandNameSize}`}> {item.name} </p>
      <p className={`${styles.product_price} ${priceSize}`}>
        {getProductPrice(item).amount}
        {getProductPrice(item).symbol}
      </p>
    </>
  );
};
