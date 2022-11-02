import React, { useContext } from 'react';
import { AppContext } from '../../../state/App.context';
import './style.scss';

export const UserBag = () => {
  const { userBag } = useContext(AppContext);
  return userBag.map((item) => (
    <div className='bag'>
      <div className='list1'>
        <div>{item.brand} </div>
        <div>{item.name}</div>
        <div>{item.count}</div>
      </div>
    </div>
  ));
};
