import React, { useContext } from "react";
import { AppWindowsContext } from "../../store/AppWindows";
import useElementDimensions from "../../hooks/useElementDimensions";


export default function Main({children, className})  {

    const {animationStartHandler, animationEndHandler } = useElementDimensions();
    const [AppWindowsState] = useContext(AppWindowsContext);

    return (
        <main onAnimationStart={animationStartHandler} onAnimationEnd={animationEndHandler} className={`cc-main-container ${AppWindowsState.mainComponentClassName}`}>{children}</main>
    )
}