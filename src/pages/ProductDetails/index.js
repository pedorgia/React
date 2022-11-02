import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductAttributes } from '../../common/ProductAttributes';
import { GET_PRODUCT } from '../../services/categories';
import { AppContext } from '../../state/App.context';

import './style.scss';

export const ProductDetails = () => {
  const { addProductToBag } = useContext(AppContext);

  const params = useParams();
  const id = params.name;

  const { loading, data, error } = useQuery(GET_PRODUCT, {
    variables: {
      id: `${id}`,
    },
  });

  const { attributes, brand, gallery, name, description } = data
    ? data.product
    : [];

  const [imgIndex, setImgIndex] = useState(0);

  //console.log(selectedAttributes);

  const { getProductPrice } = useContext(AppContext);

  const parse = require('html-react-parser');

  const { symbol, amount } = getProductPrice(data?.product);

  const [selectedAttributes, setSelectedAttributes] = useState([]);

  useEffect(() => {
    if (attributes) {
      setSelectedAttributes(
        attributes.map((attr) => ({
          id: attr.id,
          value: attr.items[0].value,
        })),
      );
    }
  }, [attributes]);

  const selectImage = (index) => {
    setImgIndex(index);
  };

  const onSelectAttribute = (item, attrId) => {
    const copy = JSON.parse(JSON.stringify(selectedAttributes));
    let attrItem = copy.find((attr) => attr.id === attrId);
    attrItem.value = item.value;
    setSelectedAttributes(copy);
  };

  const addToCart = () => {
    const newItem = {
      brand: brand,
      name: name,
      attributes: selectedAttributes,
      count: 1,
    };
    addProductToBag(newItem);
  };

  //   const compareTwoAttrArray = (arr1, arr2) => {
  //     return arr1.find((item) => {
  //       if (
  //         !arr2.includes({
  //           id: item.id,
  //           value: item.id,
  //         })
  //       )
  //         return false;
  //       else return true;
  //     });
  //   };

  //   const arr1 = [
  //     {
  //       id: 'Color',
  //       value: 'blue',
  //     },
  //   ];

  //   const arr2 = [
  //     {
  //       id: 'Color',
  //       value: 'blue',
  //     },
  //   ];

  //   console.log('compare equal--', compareTwoAttrArray(arr1, arr2));

  if (error) {
    console.log('error----', error);
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className='details'>
        <div className='images'>
          {gallery.map((item, index) => (
            <img
              key={index}
              src={item}
              alt={index}
              width='200px'
              height='200px'
              onClick={() => selectImage(index)}
            />
          ))}
        </div>
        <div className='selected_image'>
          <img
            src={gallery.find((_, index) => imgIndex === index)}
            alt='sel_item'
          />
        </div>
        <div className='info'>
          <h3 className='brand'>{brand}</h3>
          <div className='brand'>{name}</div>
          {selectedAttributes.length ? (
            <ProductAttributes
              attributes={attributes}
              selectedAttributes={selectedAttributes}
              onSelectAttribute={onSelectAttribute}
            />
          ) : null}
          <div className='price'>
            <p> price: </p>
            {symbol} {amount}
          </div>
          <button
            className='button'
            onClick={addToCart}
          >
            add to cart
          </button>
          <div>{parse(description)}</div>
        </div>
      </div>
    </>
  );
};
