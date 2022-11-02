import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import logoIMG from '../Images/Group.png';
import basket from '../Images/basket.png';
//import Select from 'react-select';
import { AppContext } from '../../state/App.context';
import { Select } from './Selector';
import { UserBag } from './UserBag';

export const Header = () => {
  const { currentCurrency, allCurrencies, setCurrentCurrency } =
    useContext(AppContext);

  const [isBagOpened, setIsBagOpened] = useState(false);

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
        <button
          className='profile_button'
          onClick={() => setIsBagOpened(!isBagOpened)}
        >
          <img
            src={basket}
            alt='basket'
            width='20px'
            height='20px'
          />
        </button>
        {isBagOpened ? <UserBag /> : null}
      </div>
    </header>
  );
};

//style="margin-left: 8px"
