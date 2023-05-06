import React, { useContext } from "react";
import Layout from "./Layout";
import useAppWindowReload from "./hooks/useAppWindowReload";
import AppLoaderMask from "./components/AppLoaderMask";
import { GlobalStateContext } from "./store/GlobalState";


/* Pages */
import Home from "./pages/home/Home";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import ManageScrapers from "./pages/ManageScraper/ManageScraper";
import InternetBrowser from "./pages/InternetBrowser/InternetBrowser";


/* Test child components */
import CardTest from "./test/CardTest";
import Card from "./components/Card/Card";



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
                    <Home>
                        <CardTest  />
                    </Home>
                    <ManageScrapers>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                    </ManageScrapers>
                    <InternetBrowser></InternetBrowser>
                    <ManageScrapers></ManageScrapers>
                    <ManageUsers>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                    </ManageUsers>
                    
                </Layout>
            </div>
        </div>
    )

}