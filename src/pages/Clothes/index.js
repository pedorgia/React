// import { useQuery } from "@apollo/client";
// import React from "react";
// import { Product } from "../../common/ProductCard";
// import { GET_CATEGORY } from "../../services/categories";

// export const Clothes = () => {

//     const {loading, data, error} = useQuery(GET_CATEGORY, {
//         variables: {
//             input: {
//                 title: "clothes"
//             }
//         }
//     });
//     const products = data ? data.category.products : [];

//     if (error) {
//         console.log('error----', error);
//     }

//     if (loading){
//         return (
//             <h1>Loading...</h1>
//         )
//     }

//     return (
//         <>
//         <h2 className="category_name">Category name</h2>
//         <div className="products_layout">
//             {products.map((item,index) => (
//                 <Product key={index} item={item}/>
//             )
//             )}
//         </div>
//         </>
//     )
// }

import React from "react";
import { ProductLayout } from "../../common/ProductLayout";

export const Clothes = () => {
    const name = "clothes";
    return (
        <ProductLayout name={name}/>
    )
}