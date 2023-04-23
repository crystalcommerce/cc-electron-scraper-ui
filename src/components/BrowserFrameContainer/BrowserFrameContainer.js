import React, { useEffect, useRef, useContext } from "react";
import Card from "../Card";
import useElementDimensions from "../../hooks/useElementDimensions";
import { AppWindowsContext } from "../../store/AppWindows";
import { ACTIONS } from "../../store/AppWindows/reducer";



export default function BrowserFrameContainer({ children })    {

    const [AppWindowsState, dispatch] = useContext(AppWindowsContext);

    const cardRef = useRef();

    useElementDimensions();

    useEffect(() => {
        
        dispatch({type : ACTIONS.SET_BROWSER_FRAME_ELEMENT, payload : cardRef.current});

    }, [cardRef, AppWindowsState.browserFrameElementHidden]);

    
    return (
        <div className="cc-browser-frame-div">
            {children}
            {!AppWindowsState.browserFrameElementHidden && 
                <Card className={"cc-browser-container"} elRef={cardRef}></Card>
            }
        </div>
    ); 
}
