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

  const { attributes, brand, gallery, name, description, prices, inStock } =
    data ? data.product : [];

  const [imgIndex, setImgIndex] = useState(0);

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
      gallery: gallery,
      brand: brand,
      name: name,
      allAttributes: attributes,
      attributes: selectedAttributes,
      prices: prices,
      count: 1,
    };
    addProductToBag(newItem);
  };

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
          {inStock ? (
            <button
              className='button'
              onClick={addToCart}
            >
              add to cart
            </button>
          ) : (
            <button className='button dis'>add to cart</button>
          )}
          <div>{parse(description)}</div>
        </div>
      </div>
    </>
  );
};
