import React from "react";
import { Typography } from "@mui/material";
import SiteLogo from "../SiteLogo";

export default function HeaderUpper({children})   {
    return (
        <div className="upper-header">
            <div className="header-logo-container">
                <SiteLogo active="true" />
                <div className="app-name-container">
                    <Typography variant="h1" className="app-name">CC ElectronJS Scraper <span className="app-name-tagline">Desktop App</span></Typography>
                </div>
            </div>
            {children}
        </div>
    );
}