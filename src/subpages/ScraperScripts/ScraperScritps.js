import React, {useState} from "react";
import FrameWindow from "../../components/FrameWindow";
import useActivePagesHook from "../../hooks/useActivePagesHook";
import { generateUuid, toUrl } from "../../utilities";

export default function ScraperScripts({children}) {
    
    const isActive = useActivePagesHook("Scraper Scripts");

    const [id] = useState(toUrl(`${generateUuid()} Scraper Scripts`));
    
    return (
        <>
            {isActive && <FrameWindow innerClassName={"no-padding"} componentId={id}>
                {children}
            </FrameWindow>}
        </>
    );
    
}