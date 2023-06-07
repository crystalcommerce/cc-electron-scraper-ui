import React, { useEffect, useState, useContext } from "react";
import useActiveSubPagesHook from "../../hooks/useActiveSubPageHook";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import Card from "../../components/Card/Card";
import { GlobalStateContext } from "../../store/GlobalState";
import useFetch from "../../hooks/useFetch";
import Table from "../../components/Table";
import useToggleCardHook from "../../hooks/useToggleCardHook";
import ToggleCardData from "../../components/ToggleCardData/ToggleCardData";
import NativeImage from "../../components/NativeImage/NativeImage";
import PaperBg from "../../components/PaperBg/PaperBg";
import { List, ListItem, Typography } from "@mui/material";
import TabbedContents from "../../components/TabbedComponent/TabbedContents";
import CodeEditor from "../../components/CodeEditor";
const {ipcRenderer} = window.require("electron");



export default function ScraperScripts({children}) {
    
    const isActive = useActiveSubPagesHook("Scraper Scripts");

    const [GlobalState] = useContext(GlobalStateContext);

    const [currentActiveScraperScript, setCurrentActiveScraperScript] = useState(null)

    const {activeCardClassName, toggleCardParentClassName, toggleClickHandler} = useToggleCardHook();

    const [screenShotObjects, setScreenShotObjects] = useState([]);

    const [imageSrc, setImageSrc] = useState(null);

    const {data : scraperScripts} = useFetch("/api/modules/scripts");

    const tableRowClickHandler = (scriptId, e) => {
        toggleClickHandler();

        const script = scraperScripts.find(item => item._id === scriptId);

        setCurrentActiveScraperScript(prev => script);

        let foundScreenShot = screenShotObjects.find(item => item.siteUrl === script.siteUrl && item.siteName === script.siteName && item.fileName === script.fileName);


        if(!foundScreenShot)  {
            ipcRenderer.send("take-screen-shot", {
                payload : {
                    AppWindowId : GlobalState.AppWindowId,
                    siteUrl : script.siteUrl,
                    siteName : script.siteName,
                    fileName : script.fileName,
                }
            });
        } else  {
            setImageSrc(foundScreenShot.siteScreenShot);
        }
        
    }

    const showSiteImage = (e, data) => {
        
        if(data.payload.AppWindowId === data.payload.AppWindowId)   {

            setImageSrc(data.payload.siteScreenShot);

            let foundScreenShot = screenShotObjects.find(item => item.siteUrl === data.payload.siteUrl && item.siteName === data.payload.siteName && item.fileName === data.payload.fileName);


            setScreenShotObjects(prev => {
                
                if(!foundScreenShot)    {
                    prev.push({
                        ...data.payload,
                        siteScreenShot : data.payload.siteScreenShot,
                    })
                }

                return [...prev];

            });

            ipcRenderer.send("close-screenshot-window",  {
                payload : {
                    screenshotWindowId : data.payload.screenshotWindowId,
                },
            });
        }
        
    }

    
    useEffect(() => {
        console.log(currentActiveScraperScript);
    }, [currentActiveScraperScript]);

    useEffect(()=> {

        ipcRenderer.on("screen-shot-taken", showSiteImage);

        return () => {
            ipcRenderer.removeListener("screen-shot-taken", showSiteImage);
        }
    }, []);
    
    return (
        <>
            {
                isActive && 
   
                <EmptyCard className={"subpage-container cc-flex  flex-grow "}>
                    <EmptyCard className={`scripts-container no-padding ${toggleCardParentClassName}`}>
                    
                    {

                        scraperScripts && scraperScripts.length > 0 && 

                        <Table 
                            tableCaption={"Scraper Scripts"}
                            tableData={scraperScripts} 
                            excludedProps={["textData", "_id"]} 
                            uniqueDataProp="_id" 
                            styledColumnObjects={[
                                {
                                    key : "orderItemMulQty",
                                    align : "right",
                                    format : (value) => value.toFixed(2),
                                    style : {
                                        minWidth : 100,
                                    }
                                },
                                {
                                    key : "orderItemMinQty",
                                    align : "right",
                                    format : (value) => value.toFixed(2),
                                    style : {
                                        minWidth : 100,
                                    }
                                },
                                {
                                    key : "description",
                                    align : "left",
                                    style : {
                                        minWidth : 170,
                                    }
                                }
                            ]}
                            showActionButtons={false}
                            showIndex={false}
                            tableRowClickHandler={tableRowClickHandler}
                        ></Table>
                    }
                    <ToggleCardData className={activeCardClassName}>
                        
                        {
                            currentActiveScraperScript && 
                            <EmptyCard className={"cc-flex cc-col gapped flex-grow cards-container"}>
                                
                                {/* toggle card header */}
                                <PaperBg className="cc-flex cc-row center-left toggle-card-header">
                                
                                    <Card className="profile-image-container">
                                        {imageSrc && 
                                            <NativeImage className="small-image" src={imageSrc}></NativeImage>
                                        }
                                    </Card>
                                    
                                    <div className={"site-info"}>
                                        <Typography className="card-title" variant="h3">Scraper Script Info</Typography>
                                        <hr className="cc-hr" />
                                        <List className="site-info-list">
                                            <ListItem>
                                                {/* <ListItemText primary={currentActiveScraperScript.siteName} secondary="Site Name" /> */}
                                                <Typography className="val" variant="p"><Typography className="key" variant="span">Site Name</Typography> : {currentActiveScraperScript.siteName}</Typography>
                                            </ListItem>
                                            
                                            <ListItem>
                                                <Typography className="val" variant="p"><Typography className="key" variant="span">Site Url</Typography> : {currentActiveScraperScript.siteUrl}</Typography>
                                            </ListItem>
                                        </List>
                                    </div>
                                </PaperBg>
                                
                                {/* toggle card body */}
                                <PaperBg className="flex-grow toggle-card-body">
                                    
                                    <TabbedContents 
                                        tabMenu={
                                            [
                                                "Scraper Script Details", 
                                                "Run Script", 
                                                "Modify Script"
                                            ]
                                        } 
                                        tabContents={
                                            [
                                                (function(){
                                                    return (
                                                        <>
                                                            <List className="site-info-list">
                                                                <ListItem>
                                                                    {/* <ListItemText primary={currentActiveScraperScript.siteName} secondary="Site Name" /> */}
                                                                    <Typography className="val" variant="p"><Typography className="key" variant="span">Script File Name</Typography> : {currentActiveScraperScript.fileNameWithExt}</Typography>
                                                                </ListItem>
                                                                
                                                                <ListItem>
                                                                    <Typography className="val" variant="p"><Typography className="key" variant="span">Script File Path</Typography> : {`${GlobalState.AppWindow.userDataPath}/modules/scripts/${currentActiveScraperScript.fileNameWithExt}`}</Typography>
                                                                </ListItem>
                                                                
                                                            </List>
                                                            <CodeEditor disabled value={currentActiveScraperScript.textData}></CodeEditor>
                                                        </>
                                                    )
                                                }()),
                                                (function(){

                                                }()),
                                                (function(){
                                                    return (
                                                        <CodeEditor value={currentActiveScraperScript.textData}></CodeEditor>
                                                    )
                                                }()),
                                            ]
                                        }
                                        ></TabbedContents>

                                </PaperBg>
                            </EmptyCard>
                            
                        }
                        
                    </ToggleCardData>
                    
                    </EmptyCard>
                </EmptyCard>
            }
        </>
        
    );
}