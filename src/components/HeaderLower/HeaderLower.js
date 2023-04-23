import React, { useContext } from "react";
import { IconButton } from "@mui/material";
import HeaderNav from "../HeaderNav";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { AppWindowsContext } from "../../store/AppWindows";
import useSidebarClickHandler from "../../hooks/useSidebarClickHandler";

export default function HeaderLower({children})   {

    const [AppWindowsState] = useContext(AppWindowsContext);

    const {showSidebarClickHandler} = useSidebarClickHandler();

    return (
        <div className="lower-header">
            <div className="sidebar-menu-button-container">
                <IconButton onClick={showSidebarClickHandler} color="primary" aria-label="add to shopping cart">
                    {!AppWindowsState.sidebarHidden && <MenuOpenIcon/>}
                    {AppWindowsState.sidebarHidden && <MenuIcon/>}
                </IconButton>
            </div>
            {children}
        </div>
    );

}