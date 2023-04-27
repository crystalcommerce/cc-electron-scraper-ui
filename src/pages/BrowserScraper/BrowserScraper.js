import React from "react";
import BrowserFrameContainer from "../../components/BrowserFrameContainer";
import useActivePagesHook from "../../hooks/useActivePagesHook";



export default function BrowserScraper({children})   {

    const isActive = useActivePagesHook("Browser Scraper");
    
    return (
        <>
            {isActive && <BrowserFrameContainer>
                {children}
            </BrowserFrameContainer>}
        </>
    );
    
}