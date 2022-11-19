import styles from './styles.module.scss';
import React, { useContext } from 'react';
import { AppContext } from '../../state/App.context';

export const ProductCountChange = ({ item, type }) => {
  const { userBag, setUserBag } = useContext(AppContext);

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

  const buttonSizeClass =
    type === 'medium' ? styles.m_button_size : styles.s_button_size;

  return (
    // <div className={`${styles.actions}`}>
    <>
      <button
        className={`${styles.add_button} ${buttonSizeClass}`}
        onClick={() => addProductCount(item)}
      >
        +
      </button>
      <div className={styles.bag_count}> {item.count}</div>
      <button
        className={`${styles.remove_button} ${buttonSizeClass}`}
        onClick={() => removeProductCount(item)}
      >
        -
      </button>
    </>
    // </div>
  );
};
