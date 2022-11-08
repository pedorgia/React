import React from 'react';
import { AttributeSizes, AttributeTypes } from './constants';
import './style.scss';

export const ProductAttributes = ({
  attributes,
  selectedAttributes,
  onSelectAttribute,
  type = AttributeSizes.Medium,
}) => {
  const isSelected = (item, attrId) => {
    const attrType = type === AttributeSizes.Medium ? 'medium' : 'small';
    const attrName = attrId === AttributeTypes.Color ? 'color' : 'attr';
    return selectedAttributes.find(
      (tmp) => attrId === tmp.id && tmp.value === item.value,
    )
      ? `${attrName}_${attrType} ${attrName}_rect ${attrName}_selected`
      : `${attrName}_${attrType} ${attrName}_rect`;
  };

  return (
    <div className={type === AttributeSizes.Medium ? 'attr_m' : 'attr_s'}>
      {attributes.map((attr, index) => {
        return (
          <>
            <div
              key={index}
              className='attr_item'
            >
              <p> {attr.id} </p>
              <div className='attr_block'>
                {attr.items.map((item, index) => (
                  <>
                    {attr.id === 'Color' ? (
                      <button
                        className={isSelected(item, attr.id)}
                        style={{ backgroundColor: item.value }}
                        onClick={() => onSelectAttribute(item, attr.id)}
                      />
                    ) : (
                      <button
                        className={isSelected(item, attr.id)}
                        onClick={() => onSelectAttribute(item, attr.id)}
                      >
                        {item.value}
                      </button>
                    )}
                  </>
                ))}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
