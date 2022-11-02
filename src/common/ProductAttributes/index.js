import React from 'react';
import './style.scss';

export const ProductAttributes = ({
  attributes,
  selectedAttributes,
  onSelectAttribute,
}) => {
  const isSelected = (item, attrId) => {
    const attrName = attrId === 'Color' ? 'color' : 'attr';
    return selectedAttributes.find(
      (tmp) => attrId === tmp.id && tmp.value === item.value,
    )
      ? `${attrName}_rect ${attrName}_selected`
      : `${attrName}_rect`;
  };

  return (
    <div className='attr'>
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
                  <div key={item.value}>
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
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
