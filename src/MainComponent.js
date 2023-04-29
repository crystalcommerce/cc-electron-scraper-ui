import React, { useRef, useContext } from "react";
import Layout from "./Layout";
import CardTest from "./test/CardTest";
import Card from "./components/Card/Card";
import { Button } from "@mui/material";
import BrowserFrame from "./pages/BrowserFrame";
import { GlobalStateContext } from "./store/GlobalState";
import { ACTIONS } from "./store/GlobalState/reducer";
import Home from "./pages/home/Home";
import ScraperFrame from "./pages/ScraperFrame";
import useAppWindowReload from "./hooks/useAppWindowReload";


export default function MainComponent() {

    useAppWindowReload();

    // const {hideBrowserFrameContainer} = useBrowserFrameHook()


    return (
        <div className={`main-component`} >

            <div className="inner-wrapper">
                <Layout>
                    {/* 
                         
                         These are the pages that are available.

                    */}
                    <BrowserFrame>
                        {/* <Card>
                            <Button onClick={hideBrowserFrameContainer}>{GlobalState.Components.BrowserFrameContainer.hidden ? "Reveal Browser Frame" : "hide browser frame"}</Button> 
                        </Card> */}
                    </BrowserFrame>
                    <Home>
                        <CardTest  />
                    </Home>
                    <ScraperFrame>
                        {/* <Card>
                            <Button onClick={hideBrowserFrameContainer}>{GlobalState.Components.BrowserFrameContainer.hidden ? "Reveal Browser Frame" : "hide browser frame"}</Button> 
                        </Card> */}
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                    </ScraperFrame>
                </Layout>
            
            </div>
        </div>
    )

}