import React, { useContext } from "react";
import SidebarNavItem from "../SidebarNavItem/SidebarNavItem";
import { Box, List, Divider } from "@mui/material";
import useSidebarNavHook from "../../hooks/useSidebarNavHook";
import { GlobalStateContext } from "../../store/GlobalState";
// import NavButton from "../NavButton";


export default function SidebarNav() {

    const {currentNavList, activePage, clickHandler, activeSubPage} = useSidebarNavHook();

    return (

        <>
            {
                currentNavList.length > 0 &&
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#2d3c46' }}>
                    <List className="cc-sidebar-nav" component="nav" aria-label="secondary mailbox folder">
                        {
                            currentNavList.map((item, index) => {
                                return(
                                    <div key={index} >
                                        <SidebarNavItem 
                                            disabled={activeSubPage && activeSubPage.page === item.page}  
                                            onClick={clickHandler.bind(this, item)} 
                                            className="sidebar-nav-item" page={item.page} 
                                            label={item.label} 
                                            hasFrameWindow={item.hasFrameWindow} 
                                        />
                                        {
                                            index !== currentNavList.length - 1 &&
                                            <Divider variant="middle" component="li" />
                                        }
                                    </div>
                                );
                            })
                        }
                    </List>
                </Box>
            }
        </>
    )
}