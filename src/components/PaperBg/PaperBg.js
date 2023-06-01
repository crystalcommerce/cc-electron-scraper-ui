import { Paper } from "@mui/material";
import React from "react";

export default function PaperBg({children, className})  {
    
    return (
        <Paper sx={{ width: '100%', backgroundColor : "#1e1e1e" }} className={className}>
            {children}
        </Paper>
    )
}