import React, { useState, useEffect, useRef, useContext } from "react";
import Layout from "./Layout";
import CardTest from "./test/CardTest";
import Card from "./components/Card/Card";
import { Button } from "@mui/material";
import BrowserScraper from "./pages/BrowserScraper";
import { AppWindowsContext } from "./store/AppWindows";
import { ACTIONS } from "./store/AppWindows/reducer";


export default function MainComponent() {

    // const {mainBodyAnimationEndHandler} = useBrowserFrameUpdater();

    //  --- start of temp code

    const [AppWindowsState, dispatch] = useContext(AppWindowsContext);

    const clickHandler = (e) => {
        dispatch({type : ACTIONS.SET_BROWSER_FRAME_HIDDEN, payload : !AppWindowsState.browserFrameElementHidden})
    }

    useEffect(() => {
        console.log(AppWindowsState)
    }, [AppWindowsState]);

    // --- end of temp code

    return (
        <div className={`main-component`} >

            <div className="inner-wrapper">
                <Layout>
                    {/* <Card/>
                    <Card/>
                    <Card/>*/}

                    {/* <BrowserScraper hidden={hidden} dimensionsUpdate={dimensionsUpdate} > */}
                    <BrowserScraper>

                        {/* start of temporary component */}
                        {/* this will probably go to the page component of the browser */}
                        <Card>
                            <Button onClick={clickHandler}>{AppWindowsState.browserFrameElementHidden ? "Reveal Browser Frame" : "hide browser frame"}</Button> 
                        </Card>
                        {/* end of temporary component */}

                    </BrowserScraper>

                </Layout>
            
            </div>
        </div>
    )

}