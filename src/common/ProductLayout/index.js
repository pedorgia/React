import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY } from "../../services/categories";
import { Product } from "../../common/ProductCard";
import './style.scss';

export const ProductLayout = ({name}) => {

    const {loading, data, error} = useQuery(GET_CATEGORY, {
        variables: {
            input: {
                title: `${name}`
            }
        }
    });
    const products = data ? data.category.products : [];

    if (error) {
        console.log('error----', error);
    }

    if (loading){
        return (
            <h1>Loading...</h1>
        )
    }


    return (
        <>
        <h2 className="category_name">{name}</h2>
        <div className="products_layout">
            {products.map((item,index) => (
                <Product key={index} item={item}/>
            )
            )}
        </div>
        </>
    )
}