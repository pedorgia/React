import React, { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../state/App.context';
import { MainInfo } from '../MainInfo';
import { ProductAttributes } from '../ProductAttributes';
import { ProductCountChange } from '../ProductCountChange';
import { ProductDescription } from '../ProductDescription';
import { ProductGallery } from '../ProductGallery';
import { ProductSummary } from '../ProductSummary';
import styles from './styles.module.scss';

export const Cart = () => {
  // const { userBag, getProductPrice, setUserBag, currentCurrency } =
  //   useContext(AppContext);

  // const [mainImage, setMainImage] = useState(() => {
  //   return userBag?.map((product) => {
  //     return {
  //       id: product.id,
  //       index: 0,
  //     };
  //   });
  // });

  // const addProductCount = (item) => {
  //   const copy = [...userBag];
  //   const myItem = copy.find((product) => product === item);
  //   myItem.count += 1;
  //   setUserBag(copy);
  // };

  // const removeProductCount = (item) => {
  //   let copy = [...userBag];
  //   const myItem = copy.find((product) => product === item);
  //   if (myItem.count === 1) {
  //     copy = copy.filter((x) => x !== myItem);
  //   } else {
  //     myItem.count -= 1;
  //   }
  //   setUserBag(copy);
  // };

  // const totalPrice = useMemo(() => {
  //   return userBag.reduce((total, item) => {
  //     total += +getProductPrice(item).amount * item.count;
  //     return Math.round(total * 100) / 100;
  //   }, 0);
  // }, [userBag, getProductPrice]);

  // const totalCount = useMemo(() => {
  //   return userBag.reduce((total, item) => {
  //     total += item.count;
  //     return total;
  //   }, 0);
  // }, [userBag]);

  // const taxes = ((totalPrice * 21) / 100).toFixed(2);

  // const showNextImage = (item) => {
  //   let copy = [...mainImage];
  //   let currentProd = copy.find((x) => x.id === item.id);
  //   const maxLength = item.gallery.length;
  //   if (currentProd.index + 1 < maxLength) {
  //     currentProd.index += 1;
  //     setMainImage(copy);
  //   }
  // };

  // const showPreviousImage = (item) => {
  //   let copy = [...mainImage];
  //   let currentProd = copy.find((x) => x.id === item.id);
  //   if (currentProd.index - 1 >= 0) {
  //     currentProd.index -= 1;
  //     setMainImage(copy);
  //   }
  // };

  // return (
  //   <div className={styles.cart}>
  //     <h2> Cart </h2>
  //     <div className={styles.bag_items}>
  //       {userBag.map((item) => (
  //         <div className={styles.one_product}>
  //           <div className={styles.bag_info}>
  //             <div className={styles.description}>
  //               <p className={styles.brand}> {item.brand} </p>
  //               <p className={styles.name}> {item.name} </p>
  //               <p className={styles.product_price}>
  //                 {getProductPrice(item).amount}
  //                 {getProductPrice(item).symbol}
  //               </p>
  //               <ProductAttributes
  //                 attributes={item.allAttributes}
  //                 selectedAttributes={item.attributes}
  //                 disabled={true}
  //               />
  //             </div>
  //             <div className={styles.actions}>
  //               <button
  //                 className={styles.add_button}
  //                 onClick={() => addProductCount(item)}
  //               >
  //                 +
  //               </button>
  //               <div className={styles.bag_count}> {item.count}</div>
  //               <button
  //                 className={styles.remove_button}
  //                 onClick={() => removeProductCount(item)}
  //               >
  //                 -
  //               </button>
  //             </div>
  //           </div>
  //           <div className={styles.main_img}>
  //             <img
  //               className={styles.product_img}
  //               src={
  //                 item.gallery[mainImage.find((x) => x.id === item.id).index]
  //               }
  //               alt='product'
  //             />
  //             <div className={styles.img_buttons}>
  //               <button onClick={() => showPreviousImage(item)}>{'<'}</button>
  //               <button onClick={() => showNextImage(item)}>{'>'}</button>
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //     <div className={styles.footer}>
  //       <div>
  //         <div>Taxes:</div>
  //         <div>
  //           {currentCurrency.symbol}
  //           {taxes}
  //         </div>
  //       </div>
  //       <div>
  //         <div>Quantity:</div>
  //         <div>{totalCount}</div>
  //       </div>
  //       <div>
  //         <div>Total:</div>
  //         <div>
  //           {currentCurrency.symbol}
  //           {totalPrice}
  //         </div>
  //       </div>
  //       {totalCount === 0 ? (
  //         <button className={styles.disabled}>Order</button>
  //       ) : (
  //         <button onClick={() => alert('You ordered! Thank you!')}>
  //           Order
  //         </button>
  //       )}
  //     </div>
  //   </div>
  // );

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
    <div className={styles.cart}>
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
      <div className={styles.footer}>
        <ProductSummary
          symbol={currentCurrency.symbol}
          taxes={taxes}
          totalCount={totalCount}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
};
