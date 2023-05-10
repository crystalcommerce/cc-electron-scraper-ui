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
import ScrapedData from "./subpages/Scraped Data/ScrapedData";
import ScraperScripts from "./subpages/ScraperScripts/ScraperScritps";
import CreateScraperScripts from "./subpages/CreateScraperScripts/CreateScraperScripts";



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
                        <ScrapedData></ScrapedData>
                        <ScraperScripts></ScraperScripts>
                        <CreateScraperScripts></CreateScraperScripts>
                    </ManageScrapers>
                    <InternetBrowser></InternetBrowser>
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