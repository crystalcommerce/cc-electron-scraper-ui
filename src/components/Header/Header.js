import React from "react";
import HeaderNav from "../HeaderNav";
import AppHeaderButtons from "../AppHeaderButtons";
import HeaderLower from "../HeaderLower/HeaderLower";
import HeaderUpper from "../HeaderUpper/HeaderUpper";


export default function Header({className})    {
    return (
        <header id="cc-main-header" className={`cc-main-header cc-flex cc-row stretch ${className}`}>
            <HeaderUpper>
                <AppHeaderButtons />
            </HeaderUpper>
            <HeaderLower>
                <HeaderNav />
            </HeaderLower>
        </header>
    );
}   