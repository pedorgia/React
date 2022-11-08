import React from 'react';
import { Header } from '../Header';
import './style.scss';

export const Layout = ({ children }) => {
  return (
    <div className='page'>
      <Header />
      <main>{children}</main>
    </div>
  );
};
