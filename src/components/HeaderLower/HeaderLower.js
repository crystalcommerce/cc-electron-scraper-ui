import React, { useContext } from "react";
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { GlobalStateContext } from "../../store/GlobalState";
import useSidebarHook from "../../hooks/useSidebarHook";
import useSidebarNavHook from "../../hooks/useSidebarNavHook";

export default function HeaderLower({children})   {

    const [GlobalState] = useContext(GlobalStateContext);

    const {showSidebarClickHandler} = useSidebarHook();

    const {disabled} = useSidebarNavHook();

    return (
        <div className="lower-header">
            <div className="sidebar-menu-button-container">
                <IconButton onClick={showSidebarClickHandler} disabled={disabled} color="primary" aria-label="show-side-bar">
                    {!GlobalState.Components.Sidebar.hidden && <MenuOpenIcon/>}
                    {GlobalState.Components.Sidebar.hidden && <MenuIcon/>}
                </IconButton>
            </div>
            {children}
        </div>
    );

}