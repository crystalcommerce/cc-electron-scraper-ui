import React, { useState, useEffect, useRef, useContext } from "react";
import Layout from "./Layout";
import CardTest from "./test/CardTest";
import Card from "./components/Card/Card";
import { Button } from "@mui/material";
import BrowserScraper from "./pages/BrowserScraper";
import { GlobalStateContext } from "./store/GlobalState";
import { ACTIONS } from "./store/GlobalState/reducer";
import Home from "./pages/home/Home";
import useBrowserFrameHook from "./hooks/useBrowserFrameHook";


export default function MainComponent() {

    const [ GlobalState ] = useContext(GlobalStateContext);

    const {hideBrowserFrameContainer} = useBrowserFrameHook()

    return (
        <div className={`main-component`} >

            <div className="inner-wrapper">
                <Layout>
                    {/* 
                         
                         These are the pages that are available.

                    */}
                    <BrowserScraper>
                        <Card>
                            <Button onClick={hideBrowserFrameContainer}>{GlobalState.Components.BrowserFrameContainer.hidden ? "Reveal Browser Frame" : "hide browser frame"}</Button> 
                        </Card>
                    </BrowserScraper>
                    <Home>
                        <CardTest  />
                    </Home>
                </Layout>
            
            </div>
        </div>
    )

}