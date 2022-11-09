import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import logoIMG from '../Images/Group.png';
import { AppContext } from '../../state/App.context';
import { Select } from './Selector';
import { UserBag } from './UserBag';

export const Header = () => {
  const { currentCurrency, allCurrencies, setCurrentCurrency } =
    useContext(AppContext);

  return (
    <header className='menu'>
      <nav className='navigation'>
        <Link
          className='navigation_item'
          to='/all'
        >
          all
        </Link>
        <Link
          className='navigation_item'
          to='/clothes'
        >
          clothes
        </Link>
        <Link
          className='navigation_item'
          to='/tech'
        >
          tech
        </Link>
      </nav>
      <Link
        className='logo'
        to='/all'
      >
        <img
          className='img_logo'
          src={logoIMG}
          alt='label'
        />
      </Link>

      <div className='profile'>
        <button className='profile_button'>
          <Select
            allCurrencies={allCurrencies}
            currentCurrency={currentCurrency}
            changeCurrentCurrency={setCurrentCurrency}
          />
        </button>
        <div className='basket_button'>
          <UserBag />
        </div>
      </div>
    </header>
  );
};
