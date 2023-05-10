import { Typography } from "@mui/material";
import React, { useState } from "react";
import useActiveSubPagesHook from "../../hooks/useActiveSubPageHook";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import Card from "../../components/Card/Card";
import ScraperFrame from "../../components/ScraperFrame/ScraperFrame";


export default function ScrapedData({children}) {
    
    const isActive = useActiveSubPagesHook("Scraped Data");
    
    return (
        <>
            {
                isActive && 
   
                <EmptyCard className={"subpage-container no-padding flex-grow"}>
                    <EmptyCard className={"no-padding cc-flex cc-row"}>
                        <Card className="scraped-data-card" classObject={{
                                xs : "col-4",
                                sm : "col-4",
                                md : "col-4",
                                lg : "col-3",
                                xlg : "col-2",
                            }}
                        ></Card>
                        
                    </EmptyCard>
                </EmptyCard>
            }
        </>
        
    );
}