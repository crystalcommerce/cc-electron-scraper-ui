import React, { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../../store/GlobalState";
import SidebarNavItem from "../SidebarNavItem/SidebarNavItem";
import { Box, List, Divider } from "@mui/material";
// import NavButton from "../NavButton";


export default function SidebarNav() {

    const [GlobalState] = useContext(GlobalStateContext);

    const [activePage, setActivePage] = useState(null);

    useEffect(() => {

        if(!activePage) {

            setActivePage(prev => GlobalState.Pages.find(item => item.isActive));

        }

    }, [GlobalState]);

    return (

        
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#2d3c46' }}>
            <List className="cc-sidebar-nav" component="nav" aria-label="secondary mailbox folder">
                {
                    activePage && GlobalState.SidebarNavItems.filter(item => activePage.page === item.parentPage).map((item, index) => {
                        return(
                            <div key={index} >
                                <SidebarNavItem className="sidebar-nav-item" page={item.page} label={item.label} hasFrameWindow={item.hasFrameWindow} />
                                {
                                    index !== GlobalState.SidebarNavItems.length - 1 &&
                                    <Divider variant="middle" component="li" />
                                }
                                
                            </div>
                        );
                    })
                }
            </List>
        </Box>
    )
}