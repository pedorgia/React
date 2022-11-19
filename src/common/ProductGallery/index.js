import styles from './styles.module.scss';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../state/App.context';

export const ProductGallery = ({ item, type }) => {
  const { userBag } = useContext(AppContext);

  const [mainImage, setMainImage] = useState(() => {
    return userBag?.map((product) => {
      return {
        id: product.id,
        index: 0,
      };
    });
  });

  const showNextImage = (item) => {
    let copy = [...mainImage];
    let currentProd = copy.find((x) => x.id === item.id);
    const maxLength = item.gallery.length;
    if (currentProd.index + 1 < maxLength) {
      currentProd.index += 1;
      setMainImage(copy);
    }
  };

  const showPreviousImage = (item) => {
    let copy = [...mainImage];
    let currentProd = copy.find((x) => x.id === item.id);
    if (currentProd.index - 1 >= 0) {
      currentProd.index -= 1;
      setMainImage(copy);
    }
  };

  const sizesClass =
    type === 'medium'
      ? styles.m_product_img_max_sizes
      : styles.s_product_img_max_sizes;

  return (
    <>
      <img
        className={`${styles.product_img} ${sizesClass}`}
        src={
          item.gallery[
            type === 'medium'
              ? mainImage.find((x) => x.id === item.id).index
              : 0
          ]
        }
        alt='product'
      />
      {type === 'medium' ? (
        <div className={styles.img_buttons}>
          <button onClick={() => showPreviousImage(item)}>{'<'}</button>
          <button onClick={() => showNextImage(item)}>{'>'}</button>
        </div>
      ) : null}
    </>
  );
};
