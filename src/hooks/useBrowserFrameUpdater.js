import React, {useState} from "react";

export default function useBrowserFrameUpdater()    {
    
    const [hidden, setHidden] = useState(true);
    const [dimensionsUpdate, setDimensionsUpdate] = useState(0);
    
    const hideClickHandler = (e) => {
        setHidden(prevState => !prevState);
    }

    const mainBodyAnimationEndHandler =(e) => {
        setDimensionsUpdate(prev => prev + 1);
    }

    return {hidden, hideClickHandler, mainBodyAnimationEndHandler, dimensionsUpdate};

}