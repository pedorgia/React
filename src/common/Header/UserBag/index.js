import React, { useContext, useMemo, useRef, useState } from 'react';
import { AppContext } from '../../../state/App.context';
import basket from '../../Images/basket.png';
import { ProductAttributes } from '../../ProductAttributes';
import { useOnClickOutside } from '../../Hooks/clickOutside';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

export const UserBag = () => {
  const { userBag, setUserBag, getProductPrice } = useContext(AppContext);

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

  const addProductCount = (item) => {
    const copy = [...userBag];
    const myItem = copy.find((product) => product === item);
    myItem.count += 1;
    setUserBag(copy);
  };

  const removeProductCount = (item) => {
    let copy = [...userBag];
    const myItem = copy.find((product) => product === item);
    if (myItem.count === 1) {
      copy = copy.filter((x) => x !== myItem);
    } else {
      myItem.count -= 1;
    }
    setUserBag(copy);
  };

  const navigate = useNavigate();

  const viewBag = () => {
    navigate('/cart');
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
                  <div className={styles.one_product}>
                    <div className={styles.bag_info}>
                      <div className={styles.description}>
                        <p> {item.brand} </p>
                        <p> {item.name} </p>
                        <p className={styles.product_price}>
                          {getProductPrice(item).amount}
                          {getProductPrice(item).symbol}
                        </p>

                        <ProductAttributes
                          attributes={item.allAttributes}
                          selectedAttributes={item.attributes}
                          type='Small'
                        />
                      </div>
                      <div className={styles.actions}>
                        <button
                          className={styles.add_button}
                          onClick={() => addProductCount(item)}
                        >
                          +
                        </button>
                        <div className={styles.bag_count}> {item.count}</div>
                        <button
                          className={styles.remove_button}
                          onClick={() => removeProductCount(item)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <div className={styles.main_img}>
                      <img
                        className={styles.product_img}
                        src={item.gallery[0]}
                        alt='product'
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.bag_footer}>
                <div className={styles.total_price}>
                  <h3>Total </h3>
                  <h3>{totalPrice}</h3>
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
