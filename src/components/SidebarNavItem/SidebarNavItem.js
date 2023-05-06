import React, { useContext } from "react";
import useSidebarNavItemHook from "../../hooks/useSibarNavItemHook";
import { GlobalStateContext } from "../../store/GlobalState";
import { ListItemButton, ListItemText } from "@mui/material";

export default function SidebarNavItem({className, label, page, hasFrameWindow, onClick, index}) {

    let { selected, clickHandler } = useSidebarNavItemHook(page, onClick, hasFrameWindow, index);
    
    const [GlobalState] = useContext(GlobalStateContext);

    return (
        <ListItemButton
          selected={selected}
          onClick={clickHandler}
          className={className}
        >  
            
            <ListItemText disabled primary={label} />
            {/* {
                !disabled && 
                <Button style={{textTransform: "none"}} fullWidth variant={variant} onClick={clickHandler}>{children}</Button>
            }
            {
                disabled && isLoading &&
                <Button style={{textTransform: "none"}} fullWidth variant={variant} onClick={clickHandler} startIcon={<CircularProgress size="16px" color="inherit" />} disabled> {children}</Button>
            }
            {
                disabled && GlobalState.Pages.find(item => item.page === page).isActive &&
                <Button style={{textTransform: "none"}} fullWidth variant={variant} onClick={clickHandler} disabled>{children}</Button>
            } */}
            
        </ListItemButton>
    );
}


{/* <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Trash" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary="Spam" />
        </ListItemButton>
      </List> */}