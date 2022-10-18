import React from "react";
import { Header } from "../header/header";


export const Layout = ({children}) => {
    return (
        <div className="page">
            <Header />
            <main>{children}</main>
        </div>
    )
}