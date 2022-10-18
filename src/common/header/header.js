import React from "react";
import {
    Link
  } from "react-router-dom";
import './header.scss';
import logoIMG from '../images/Group.png';
import arrow from '../images/Vector.png';
import dollar from '../images/$.png';
import basket from '../images/basket.png';

export const Header = () => {
    
    return (
            <header className="menu">
                <nav className="navigation">
                    <Link className="navigation_item" to="/women">women</Link>
                    <Link className="navigation_item" to="/men">men</Link>
                    <Link className="navigation_item" to="/kids">kids</Link>
                </nav>
                <Link className="logo" to="/">
                    <img className="img_logo" src={logoIMG} alt="label" />
                </Link>
                  
                <div className="profile">
                    <button className="profile_button">
                        <img src={dollar} alt="$" width="10px" height="20px" />
                        <img src={arrow} alt="arrow" width="6px" height="3px"  />
                    </button>
                    <button className="profile_button">
                        <img src={basket} alt="basket" width="20px" height="20px" />
                    </button>
                </div>  
                
            </header>
        );
}

//style="margin-left: 8px"