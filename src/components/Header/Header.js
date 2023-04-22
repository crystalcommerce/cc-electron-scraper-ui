import React from "react";
import { Typography, IconButton } from "@mui/material";
import SiteLogo from "../SiteLogo";
import AppHeaderButtons from "../AppHeaderButtons";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HeaderNav from "../HeaderNav";


export default function Header({className, showSidebarClickHandler, menuOpen})    {
    
    return (
        <header id="cc-main-header" className={`cc-main-header cc-flex cc-row stretch ${className}`}>

                <div className="upper-header">
                    <div className="header-logo-container">
                        <SiteLogo active="true" />
                        <div className="app-name-container">
                            <Typography variant="h1" className="app-name">CC ElectronJS Scraper <span className="app-name-tagline">Desktop App</span></Typography>
                        </div>
                    </div>
                    <AppHeaderButtons />
                </div>
                <div className="lower-header">
                    <div className="sidebar-menu-button-container">
                        <IconButton onClick={showSidebarClickHandler} color="primary" aria-label="add to shopping cart">
                            {menuOpen && <MenuOpenIcon/>}
                            {!menuOpen && <MenuIcon/>}
                        </IconButton>
                    </div>
                    <HeaderNav />
                </div>

        </header>
    )


}   