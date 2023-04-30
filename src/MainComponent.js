import React, { useContext } from "react";
import Layout from "./Layout";
import CardTest from "./test/CardTest";
import Card from "./components/Card/Card";
import BrowserFrame from "./pages/BrowserFrame";
import Home from "./pages/home/Home";
import ScraperFrame from "./pages/ScraperFrame";
import useAppWindowReload from "./hooks/useAppWindowReload";
import AppLoaderMask from "./components/AppLoaderMask";
import { GlobalStateContext } from "./store/GlobalState";
import ManageUsers from "./pages/ManageUsers/ManageUsers";


export default function MainComponent() {

    useAppWindowReload();

    const [GlobalState] = useContext(GlobalStateContext);

    return (
        <div className={`main-component`} >
            <AppLoaderMask open={GlobalState.AppWindow.isLoading} />
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

                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                    </ScraperFrame>
                    <ManageUsers>

                    </ManageUsers>
                </Layout>
            
            </div>
        </div>
    )

}