import React, {useState} from "react";
import FrameWindow from "../../components/FrameWindow";
import useActivePagesHook from "../../hooks/useActivePagesHook";
import { generateUuid, toUrl } from "../../utilities";

export default function ScraperFrame({children}) {
    
    const isActive = useActivePagesHook("Scraper Frame");

    const [id] = useState(toUrl(`${generateUuid()} Scraper Frame`));
    
    return (
        <>
            {isActive && <FrameWindow componentId={id}>
                {children}
            </FrameWindow>}
            {/* {isActive && <BrowserFrameContainer>
                {children}
            </BrowserFrameContainer>} */}
        </>
    );
}