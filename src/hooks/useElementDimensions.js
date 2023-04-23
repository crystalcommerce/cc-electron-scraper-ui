import React, {useState, useEffect, useCallback, useContext} from "react";
import { AppWindowsContext } from "../store/AppWindows";

const { ipcRenderer } = window.require("electron");

export default function useElementDimensions() {

    const [AppWindowsState] = useContext(AppWindowsContext);

    const [stylesObject, setStylesObject] = useState({});

    const updateFrameWindow = (data) => {
        console.log(data);
        ipcRenderer.send("update-frame-window", data);
    }

    const getStylesObjectHandler = useCallback((e) => {

        if(AppWindowsState.browserFrameElement)   {

            const currentStyles = getComputedStyle(AppWindowsState.browserFrameElement);

            setStylesObject(prevState => {

                const updatedStyles = {
                    width : Number(currentStyles.width.replace("px", "")),
                    height : Number(currentStyles.height.replace("px", "")),
                    paddingTop : Number(currentStyles.paddingTop.replace("px", "")),
                    paddingBottom : Number(currentStyles.paddingBottom.replace("px", "")),
                    paddingLeft : Number(currentStyles.paddingLeft.replace("px", "")),
                    paddingRight : Number(currentStyles.paddingRight.replace("px", "")),
                    offsetTop : AppWindowsState.browserFrameElement.offsetTop,
                    offsetLeft : AppWindowsState.browserFrameElement.offsetLeft,
                    windowId : AppWindowsState.appWindowId,
                };
                updateFrameWindow(updatedStyles);
                return updatedStyles;
            });

        } else  {

            setStylesObject(prevState => {
                const updatedStyles = {
                    width : 0,
                    height : 0,
                    paddingTop : 0,
                    paddingBottom : 0,
                    paddingLeft : 0,
                    paddingRight : 0,
                    windowId : AppWindowsState.appWindowId,
                };

                updateFrameWindow(updatedStyles);
                return updatedStyles;
            });
        }

    }, [stylesObject]);

    

    useEffect(() => {

        getStylesObjectHandler();

        window.addEventListener("resize", getStylesObjectHandler);
        window.addEventListener("load", getStylesObjectHandler);


        return () => {
            window.removeEventListener("resize", getStylesObjectHandler);
            window.removeEventListener("load", getStylesObjectHandler);
        }

    }, [AppWindowsState.browserFrameElementHidden, AppWindowsState.browserFrameDimensionsUpdate]);

}