import React, { useState } from "react";
import FrameWindow from "../../components/FrameWindow";
import useActivePagesHook from "../../hooks/useActivePagesHook";
import { generateUuid, toUrl } from "../../utilities";

export default function BrowserFrame({children})   {

    const isActive = useActivePagesHook("Internet Browser");

    const [id] = useState(toUrl(`${generateUuid()} Browser Frame`));
    
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