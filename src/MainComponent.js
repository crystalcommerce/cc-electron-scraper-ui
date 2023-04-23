import React, { useState, useEffect, useRef, useContext } from "react";
import Layout from "./Layout";
import CardTest from "./test/CardTest";
import Card from "./components/Card/Card";
import { Button } from "@mui/material";
import BrowserScraper from "./pages/BrowserScraper";
import useBrowserFrameUpdater from "./hooks/useBrowserFrameUpdater";


export default function MainComponent() {

    const {hidden, hideClickHandler, dimensionsUpdate,mainBodyAnimationEndHandler} = useBrowserFrameUpdater();


    return (
        <div className={`main-component`} >

            <div className="inner-wrapper">
                <Layout mainBodyAnimationEndHandler={mainBodyAnimationEndHandler}>
                    {/* <Card/>
                    <Card/>
                    <Card/>*/}

                    <BrowserScraper hidden={hidden} dimensionsUpdate={dimensionsUpdate} >
                        <Card>
                            <Button onClick={hideClickHandler}>{hidden ? "Reveal Browser Frame" : "hide browser frame"}</Button> 
                        </Card>
                    </BrowserScraper>

                </Layout>
            
            </div>
        </div>
    )

}