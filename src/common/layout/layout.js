import React from "react";
import { Header } from "../header/header";


export const Layout = ({children}) => {
    return (
        <>
        <Header />
        <main>{children}</main>
        </>
    )
}