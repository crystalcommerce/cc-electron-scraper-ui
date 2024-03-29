import React from "react";
import Card from "../../components/Card/Card";
import { Typography } from "@mui/material";
import useActivePagesHook from "../../hooks/useActivePagesHook";

export default function ManageUsers({children})   {
    
    const isActive = useActivePagesHook("Manage Users");
    return (
        <>
            {isActive && 
                
                <div className="cc-page-div">
                    <Card>Manage Users</Card>
                    {children}
                </div>
            }
        </>
    );

}