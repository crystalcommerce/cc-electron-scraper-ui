import React, { useContext, useEffect, useState } from "react";
import useElementDimensions from "./useElementDimensions";
import { generateUuid, toUrl } from "../utilities";
import { GlobalStateContext } from "../store/GlobalState";



export default function useScraperFrameHook(cardRef)   {

    const [GlobalState] = useContext(GlobalStateContext);

    const {getDimensions} = useElementDimensions();

    const [componentId] = useState(toUrl(`${generateUuid()} Browser Frame`));

    const adjustElHeight = (e) => {
        const styleObjects = getDimensions(cardRef.current);

        // console.log(styleObjects.width + "px");

        // cardRef.current.style.height = styleObjects.width + "px";
    }

    useEffect(() => {

        adjustElHeight();

        cardRef.current.addEventListener("resize", adjustElHeight);

        window.addEventListener("load", adjustElHeight);
        window.addEventListener("resize", adjustElHeight);

        
        // console.log(GlobalState.AppWindow);
        return () => {
            window.removeEventListener("load", adjustElHeight);
            window.removeEventListener("resize", adjustElHeight);
        }
    }, [getDimensions(cardRef.current)]);

    return {getDimensions};

}