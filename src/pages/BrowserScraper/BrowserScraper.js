import React from "react";
import BrowserFrameContainer from "../../components/BrowserFrameContainer";


export default function BrowserScraper({hidden, dimensionsUpdate, children})   {
    
    return (
        <BrowserFrameContainer hidden={hidden} dimensionsUpdate={dimensionsUpdate}>
            {children}
        </BrowserFrameContainer>
    );
    
}