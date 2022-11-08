import React, { useContext } from 'react';
import { AppContext } from '../../state/App.context';
import './style.scss';

export const Cart = () => {
  const { userBag } = useContext(AppContext);

  return (
    <div className='cart'>
      <h2> Cart </h2>
    </div>
  );
};
