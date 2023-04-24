import React, { useContext } from "react";
import useBrowserFrameAnimation from "../../hooks/useBrowserFrameAnimation";
import { AppWindowsContext } from "../../store/AppWindows";


export default function Main({children, className})  {

    const {mainBodyAnimationEndHandler} = useBrowserFrameAnimation();
    const [AppWindowsState] = useContext(AppWindowsContext);

    return (
        <main onAnimationIteration={mainBodyAnimationEndHandler} className={`cc-main-container ${AppWindowsState.mainComponentClassName}`}>{children}</main>
    )
}