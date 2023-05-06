import React from "react";
import Card from "../../components/Card/Card";
import { Typography } from "@mui/material";
import useActivePagesHook from "../../hooks/useActivePagesHook";

export default function ManageScraper({children})   {
    
    const isActive = useActivePagesHook("Manage Scraper");
    return (
        <>
            {isActive && 
                <div className="cc-page-div">
                    <Card>Manage Scrapers</Card>
                    {children}
                </div>
                
            }
        </>
    );

}