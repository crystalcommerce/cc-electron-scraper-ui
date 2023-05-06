import React, { useState } from "react";
import FrameWindow from "../../components/FrameWindow";
import useActivePagesHook from "../../hooks/useActivePagesHook";
import { generateUuid, toUrl } from "../../utilities";
import BrowserHeader from "../../components/BrowserHeader/BrowserHeader";


export default function InternetBrowser({children})   {

    const isActive = useActivePagesHook("Internet Browser");

    const [id] = useState(toUrl(`${generateUuid()} Browser Frame`));
    
    return (
        <>
            {isActive && 

                <FrameWindow componentId={id} className={"cc-browser-frame-component"} innerClassName="no-padding no-shadow">
                    <BrowserHeader></BrowserHeader>
                </FrameWindow>
            }
        </>
    );
    
}