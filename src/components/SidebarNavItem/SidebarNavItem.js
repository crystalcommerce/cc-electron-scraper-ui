import React, { useContext } from "react";
import { ListItemButton, ListItemText } from "@mui/material";

export default function SidebarNavItem({className, label, onClick, selected, disabled}) {

    return (
        <ListItemButton
          selected={selected}
          onClick={onClick}
          className={className}
          disabled={disabled}
        >  
            
            <ListItemText disabled primary={label} />

            
        </ListItemButton>
    );
}
