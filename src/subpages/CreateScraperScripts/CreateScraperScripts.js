import React, {useState} from "react";
import useActiveSubPagesHook from "../../hooks/useActiveSubPageHook";
import { Typography } from "@mui/material";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import Card from "../../components/Card/Card";

export default function CreateScraperScripts({children}) {

    const isActive = useActiveSubPagesHook("Create Scraper Scripts");

    
    return (
        <>
            {
                isActive && 

                <EmptyCard className={"subpage-container flex-grow"}>
                    <Typography>Create Scraper Scripts page</Typography>
                    {children}
                </EmptyCard>
            }
        </>
    );
}