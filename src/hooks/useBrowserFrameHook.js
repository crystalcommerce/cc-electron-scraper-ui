import React, {useState, useEffect, useContext} from "react";
import { GlobalStateContext } from "../store/GlobalState";
import { ACTIONS } from "../store/GlobalState/reducer";

const { ipcRenderer } = window.require("electron");

export default function useBrowserFrameHook() {

    const [GlobalState, dispatch] = useContext(GlobalStateContext);

    const [stylesObject, setStylesObject] = useState({});

    const updateFrameWindow = (data) => {
        // console.log(data);
        ipcRenderer.send("update-main-frame-window", {
            browserFrameStyles : data,
            windowId : GlobalState.AppWindowId,
        });
    };

    const getStylesObjectHandler = (e) => {

        if(GlobalState.Components.BrowserFrameContainer.element && !GlobalState.Components.BrowserFrameContainer.hidden)   {

            const currentStyles = getComputedStyle(GlobalState.Components.BrowserFrameContainer.element);

            setStylesObject(prevState => {

                const updatedStyles = {
                    width : Number(currentStyles.width.replace("px", "")),
                    height : Number(currentStyles.height.replace("px", "")),
                    paddingTop : Number(currentStyles.paddingTop.replace("px", "")),
                    paddingBottom : Number(currentStyles.paddingBottom.replace("px", "")),
                    paddingLeft : Number(currentStyles.paddingLeft.replace("px", "")),
                    paddingRight : Number(currentStyles.paddingRight.replace("px", "")),
                    offsetTop : GlobalState.Components.BrowserFrameContainer.element.offsetTop,
                    offsetLeft : GlobalState.Components.BrowserFrameContainer.element.offsetLeft,
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
                    offsetTop : 0,
                    offsetLeft : 0,
                };

                updateFrameWindow(updatedStyles);
                return updatedStyles;
            });
            
        }

    };

    const animationFunction = (callback) => {
        let interval = null,
            count = 0;

        function startHandler()   {
            if(interval)    {
                clearInterval(interval);
                count = 0;
                interval = null;
            }

            interval = setInterval(() => {
            
                callback();
                count++;
                if(count >= 20)    {
                    endHandler();
                }
    
            }, 10);

        }

        function endHandler()   {

            if(interval)    {
                // console.log("\n\n\n")
                clearInterval(interval);
                count = 0;
                interval = null;
            }

            callback();

        }

        return { startHandler, endHandler };
    }

    const { startHandler, endHandler } = animationFunction(getStylesObjectHandler);

    const animationStartHandler = () =>  startHandler();

    const animationEndHandler = () =>  endHandler();    

    const hideBrowserFrameContainer = (e) => {
        dispatch({
            type : ACTIONS.UPDATE_COMPONENTS, payload : {
                BrowserFrameContainer : {
                    hidden : !GlobalState.Components.BrowserFrameContainer.hidden,
                }
            } /* !GLobalState.browserFrameElementHidden */
        })
    }

    useEffect(() => {

        getStylesObjectHandler();

        window.addEventListener("resize", getStylesObjectHandler);
        window.addEventListener("load", getStylesObjectHandler);


        return () => {
            // animationEndHandler();
            window.removeEventListener("resize", getStylesObjectHandler);
            window.removeEventListener("load", getStylesObjectHandler);
        }

    }, [GlobalState]);


    return {animationStartHandler, animationEndHandler, hideBrowserFrameContainer};
}