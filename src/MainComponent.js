import React, { useState, useEffect, useRef } from "react";
import Layout from "./Layout";
import CardTest from "./test/CardTest";
import Card from "./components/Card/Card";
import BrowserFrameContainer from "./components/BrowserFrameContainer";
import { Button } from "@mui/material";


export default function MainComponent() {

    const [hidden, setHidden] = useState(false);
    const [dimensionsUpdate, setDimensionsUpdate] = useState(0);
    
    const clickHandler = (e) => {
        setHidden(prevState => !prevState);
    }

    const mainBodyAnimationEndHandler =(e) => {
        setDimensionsUpdate(prev => prev + 1);
    }



    return (
        <div className={`main-component`} >

            <div className="inner-wrapper">
                <Layout mainBodyAnimationEndHandler={mainBodyAnimationEndHandler}>
                    {/* <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/> */}
                    <BrowserFrameContainer hidden={hidden} dimensionsUpdate={dimensionsUpdate}>
                        <Card>
                            <Button onClick={clickHandler}>Hide it</Button> 
                        </Card>
                    </BrowserFrameContainer>
                    {/* <CardTest /> */}
                </Layout>
            
            </div>
        </div>
    )

}