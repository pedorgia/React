import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../state/App.context';
import { ProductAttributes } from '../ProductAttributes';
import { ProductCountChange } from '../ProductCountChange';
import { ProductDescription } from '../ProductDescription';
import { ProductGallery } from '../ProductGallery';
import { ProductSummary } from '../ProductSummary';
import styles from './styles.module.scss';

export const MainInfo = () => {
  const { userBag, getProductPrice, currentCurrency } = useContext(AppContext);

  const type = 'medium';

  const totalPrice = useMemo(() => {
    return userBag.reduce((total, item) => {
      total += +getProductPrice(item).amount * item.count;
      return Math.round(total * 100) / 100;
    }, 0);
  }, [userBag, getProductPrice]);

  const totalCount = useMemo(() => {
    return userBag.reduce((total, item) => {
      total += item.count;
      return total;
    }, 0);
  }, [userBag]);

  const taxes = ((totalPrice * 21) / 100).toFixed(2);

  return (
    <>
      <h2> Cart </h2>
      <div className={styles.bag_items}>
        {userBag.map((item) => (
          <div
            key={item.id}
            className={styles.one_product}
          >
            <div className={styles.bag_info}>
              <div className={styles.description}>
                <ProductDescription
                  item={item}
                  type={type}
                />
                <ProductAttributes
                  attributes={item.allAttributes}
                  selectedAttributes={item.attributes}
                  disabled={true}
                  type={type}
                />
              </div>
              <ProductCountChange
                item={item}
                type={type}
              />
            </div>
            <div className={styles.main_img}>
              <ProductGallery
                item={item}
                type={type}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <ProductSummary
          symbol={currentCurrency.symbol}
          taxes={taxes}
          totalCount={totalCount}
          totalPrice={totalPrice}
        />
      </div>
    </>
  );
};
