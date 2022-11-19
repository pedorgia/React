import React from 'react';
import { AttributeSizes, AttributeTypes } from './constants';
import './style.scss';

export const ProductAttributes = ({
  attributes,
  selectedAttributes,
  onSelectAttribute,
  type = AttributeSizes.Medium,
  disabled = false,
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

  const cursor_class = disabled ? 'default' : 'pointer';

  return (
    <div className={type === AttributeSizes.Medium ? 'attr_m' : 'attr_s'}>
      {attributes.map((attr) => {
        return (
          <div
            key={attr.id}
            className='attr_item'
          >
            <p> {attr.id} </p>
            <div className='attr_block'>
              {attr.items.map((item, index) => (
                <span key={item.id}>
                  {attr.id === 'Color' ? (
                    <button
                      className={isSelected(item, attr.id)}
                      style={{
                        backgroundColor: item.value,
                        cursor: cursor_class,
                      }}
                      onClick={() =>
                        disabled ? null : onSelectAttribute(item, attr.id)
                      }
                    />
                  ) : (
                    <button
                      className={isSelected(item, attr.id)}
                      style={{ cursor: cursor_class }}
                      onClick={() =>
                        disabled ? null : onSelectAttribute(item, attr.id)
                      }
                    >
                      {item.value}
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
