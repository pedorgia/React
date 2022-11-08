import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_CURRENCIES } from '../services/categories';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [userBag, setUserBag] = useState([]);

  const [currentCurrency, setCurrentCurrency] = useState({});

  const [allCurrencies, setAllCurrencies] = useState([]);

  const { data } = useQuery(GET_CURRENCIES);

  const getProductPrice = (item) => {
    const curItem = item?.prices?.find(
      (cur) => cur.currency.symbol === currentCurrency?.symbol,
    );
    const amount = curItem?.amount;
    const symbol = curItem?.currency.symbol;
    return { amount, symbol };
  };

  const addProductToBag = (product) => {
    const similarProducts = userBag.filter(
      (x) => x.brand === product.brand && x.name === product.name,
    );

    if (similarProducts.length) {
      let existedProduct;
      for (let i = 0; i < similarProducts.length; i++) {
        const similarProduct = similarProducts[i];

        let fullCoincidence = true;
        for (let j = 0; j < similarProduct.attributes.length; j++) {
          const item = similarProduct.attributes[j];
          if (
            !product.attributes.some(
              (x) => x.id === item.id && x.value === item.value,
            )
          ) {
            fullCoincidence = false;
            break;
          }
        }
        if (fullCoincidence) {
          existedProduct = similarProduct;
          break;
        }
      }
      if (!existedProduct) {
        setUserBag((currentUserBag) => [...currentUserBag, product]);
      } else {
        const index = userBag.indexOf(existedProduct);
        const copy = [...userBag];
        copy[index].count += 1;
        setUserBag(copy);
      }
    } else {
      setUserBag((currentUserBag) => {
        return [...currentUserBag, product];
      });
    }
  };

  console.log('userBag---', userBag);

  useEffect(() => {
    if (data) {
      setAllCurrencies(data.currencies);
      setCurrentCurrency(data.currencies[0]);
    }
  }, [data]);

  const contextValue = {
    currentCurrency,
    setCurrentCurrency,
    allCurrencies,
    getProductPrice,
    userBag,
    setUserBag,
    addProductToBag,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
