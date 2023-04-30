import React from "react";
import Card from "../../components/Card/Card";
import { Typography } from "@mui/material";
import useActivePagesHook from "../../hooks/useActivePagesHook";

export default function ManageUsers()   {
    
    const isActive = useActivePagesHook("Manage Users");
    return (
        <>
            {isActive && 
                <Card>Hello there...</Card>
            }
        </>
    );


}