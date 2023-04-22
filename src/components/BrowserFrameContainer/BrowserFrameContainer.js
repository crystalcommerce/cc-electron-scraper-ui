import React, { useState, useEffect, useRef } from "react";
import Card from "../Card";
import useElementDimensions from "../../hooks/useElementDimensions";

const { ipcRenderer } = window.require("electron");


export default function BrowserFrameContainer({children, hidden, dimensionsUpdate})    {

    const cardRef = useRef();

    const updateFrameWindow = (data) => {
        console.log(data);
        ipcRenderer.send("update-frame-window", data);
    }

    useElementDimensions(cardRef, hidden, dimensionsUpdate, updateFrameWindow);
    
    return (
        <div className="cc-browser-frame-div">
            {children}
            {!hidden && 
                <Card className={"cc-browser-container"} elRef={cardRef}></Card>
            }
        </div>
    ); 
}
