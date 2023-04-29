import React, { useRef } from "react";
import Card from "../Card";
import useFrameWindowHook from "../../hooks/useFrameWindowHook";



export default function FrameWindow({ children, componentId })    {

    const cardRef = useRef();

    useFrameWindowHook(componentId, cardRef);

    return (
        <div className={`cc-browser-frame-div`}>
            {children}

            <Card className={`cc-browser-container `} elRef={cardRef}></Card>
            
        </div>
    );

}
