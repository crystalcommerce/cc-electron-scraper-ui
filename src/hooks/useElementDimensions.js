import React, {useState, useEffect, useCallback, useContext} from "react";
import { AppWindowsContext } from "../store/AppWindows";


export default function useElementDimensions(elRef, hidden, dimensionsUpdate, callback) {

    const [AppWindowsState] = useContext(AppWindowsContext);

    const [stylesObject, setStylesObject] = useState({});

    const getStylesObjectHandler = useCallback((e) => {

        if(elRef && elRef.current)   {

            const elObject = elRef.current;

            const currentStyles = getComputedStyle(elObject);

            setStylesObject(prevState => {

                const updatedStyles = {
                    width : Number(currentStyles.width.replace("px", "")),
                    height : Number(currentStyles.height.replace("px", "")),
                    paddingTop : Number(currentStyles.paddingTop.replace("px", "")),
                    paddingBottom : Number(currentStyles.paddingBottom.replace("px", "")),
                    paddingLeft : Number(currentStyles.paddingLeft.replace("px", "")),
                    paddingRight : Number(currentStyles.paddingRight.replace("px", "")),
                    offsetTop : elObject.offsetTop,
                    offsetLeft : elObject.offsetLeft,
                    windowId : AppWindowsState.appWindowId,
                };
                callback(updatedStyles);
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

                callback(updatedStyles);
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

    }, [hidden, dimensionsUpdate]);


    return stylesObject;

}