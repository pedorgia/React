import React, { useContext, useMemo, useRef, useState } from 'react';
import { AppContext } from '../../../state/App.context';
import basket from '../../Images/basket.png';
import { ProductAttributes } from '../../ProductAttributes';
import { useOnClickOutside } from '../../Hooks/clickOutside';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { ProductDescription } from '../../ProductDescription';
import { ProductCountChange } from '../../ProductCountChange';
import { ProductGallery } from '../../ProductGallery';

export const UserBag = () => {
  const { userBag, getProductPrice, currentCurrency } = useContext(AppContext);

  const [isBagOpened, setIsBagOpened] = useState(false);
  const ref = useRef();

  const totalCount = useMemo(() => {
    return userBag.reduce((total, item) => {
      total += item.count;
      return total;
    }, 0);
  }, [userBag]);

  const totalPrice = useMemo(() => {
    return userBag.reduce((total, item) => {
      total += +getProductPrice(item).amount * item.count;
      return Math.round(total * 100) / 100;
    }, 0);
  }, [userBag, getProductPrice]);

  const type = 'small';
  const symbol = currentCurrency.symbol;
  const navigate = useNavigate();

  const viewBag = () => {
    navigate('/cart');
    setIsBagOpened(false);
  };

  useOnClickOutside(ref, () => setIsBagOpened(false));

  return (
    <>
      <div
        className={styles.basket}
        ref={ref}
      >
        <button className={styles.basket_img}>
          <img
            onClick={() => setIsBagOpened(!isBagOpened)}
            src={basket}
            alt='basket'
            width='20px'
            height='20px'
          />
          {totalCount === 0 ? null : (
            <div className={styles.circle}>{totalCount}</div>
          )}
        </button>
        {isBagOpened ? (
          <>
            <div className={styles.bag}>
              <div className={styles.bag_header}>
                <h3>My Bag, {totalCount} items</h3>
              </div>
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
                      <div className={styles.count_change}>
                        <ProductCountChange
                          item={item}
                          type={type}
                        />
                      </div>
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

              <div className={styles.bag_footer}>
                <div className={styles.total_price}>
                  <h3>Total </h3>
                  <h3>
                    {symbol}
                    {totalPrice}
                  </h3>
                </div>
                <div className={styles.action_button}>
                  <button
                    className={styles.view_bag}
                    onClick={viewBag}
                  >
                    View bag
                  </button>
                  <button className={styles.checkout}>Checkout</button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
