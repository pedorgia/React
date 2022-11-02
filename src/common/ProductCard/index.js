import React, { useContext } from "react";
import './style.scss';
import cart from '../Images/buy.png';
import { AppContext } from "../../state/App.context";
import { useNavigate } from "react-router-dom";

export const Product = ({item}) => {

    const {getProductPrice} = useContext(AppContext);

    const navigate = useNavigate();

    const openDetails = (id) => {
        navigate(`/products/${id}`);
    }

    const main_img = item.gallery[0];
    const {name} = item;

    const out_of_stock = !item.inStock;
    const stockClass = out_of_stock ? "categories_item disabled" : "categories_item";
    const {symbol, amount} = getProductPrice(item);

    return (
        <div className={stockClass}  onClick={() => openDetails(item.id)}>
            {out_of_stock ? null : <div className="buy_me_img">
                <img src={cart} alt="basket" width="35px" height="35px" />
            </div>}
            <div className="clothes">
                <img src={main_img} alt="sweater1" />
                {out_of_stock ? <div className="out_of_stock">Out of stock</div> : null}
            </div>
            <div className="description">
                {name}
            </div>
            <div className="price">
                {symbol} {amount}
            </div>
        </div>
    )
}

// <img src={main_img} width ="360px" height="340px" alt="sweater1" />