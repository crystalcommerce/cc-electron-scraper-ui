import React, {useContext, useState} from "react";
import { AppWindowsContext } from "../store/AppWindows";
import { ACTIONS } from "../store/AppWindows/reducer";

export default function useBrowserFrameAnimation()    {
    

    const [AppWindowsState, dispatch] = useContext(AppWindowsContext);

    const mainBodyAnimationEndHandler =(e) => {
        dispatch({type : ACTIONS.SET_BROWSER_FRAME_DIMENSIONS_UPDATE, payload : AppWindowsState.browserFrameDimensionsUpdate + 1});
    }

    return {mainBodyAnimationEndHandler};

}