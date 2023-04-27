import React, { useEffect, useRef, useContext } from "react";
import Card from "../Card";
import useBrowserFrameHook from "../../hooks/useBrowserFrameHook";
import { GlobalStateContext } from "../../store/GlobalState";
import { ACTIONS } from "../../store/GlobalState/reducer";



export default function BrowserFrameContainer({ children })    {

    const [GlobalState, dispatch] = useContext(GlobalStateContext);

    const cardRef = useRef();

    useBrowserFrameHook();

    useEffect(() => {
        
        dispatch({
            type : ACTIONS.UPDATE_COMPONENTS, 
            payload : {
                BrowserFrameContainer : {
                    element : cardRef.current,
                }
            }
        });

    }, [cardRef, GlobalState.Components.BrowserFrameContainer.hidden]);

    
    return (
        <div className={`cc-browser-frame-div ${GlobalState.Components.BrowserFrameContainer.hidden ? "hidden" :""}`}>
            {children}

            <Card className={`cc-browser-container `} elRef={cardRef}></Card>
            
        </div>
    ); 
}
