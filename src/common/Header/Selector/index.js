import React, { useRef, useState } from "react";
import './style.scss';
import arrow from '../../Images/Vector.png';
import { useOnClickOutside } from "../../Hooks/clickOutside";

export const Select = ({allCurrencies, currentCurrency, changeCurrentCurrency}) => {

    const [openMode, setOpenMode] = useState(false);

    const ref = useRef();
    useOnClickOutside(ref, () => setOpenMode(false));

    const arrowClick = () => {
        setOpenMode(!openMode);
    }

    const changeCurrency = (item) => {
        changeCurrentCurrency(item);
        arrowClick();
    }

    const arrowClass = openMode? "opened" : "closed";

    return (
        <div className="select" ref={ref}>
            <div className="cur_arrow" onClick={arrowClick} >
                <div className="symbol">
                    {currentCurrency.symbol}
                </div>
                <img className={arrowClass} src={arrow} alt="arrow" width="8px" height="4px" />
                
            </div>
            {openMode ? <div className="list" >
                {allCurrencies.map(item => (
                    <div key={item.label} className="rows" onClick={() => changeCurrency(item)}>
                        {item.symbol + " " + item.label}
                    </div>
                ))}
            </div>
            : null}
            
        </div>
    )
}