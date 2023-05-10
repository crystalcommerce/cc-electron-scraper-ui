import React, { useEffect, useState, useContext } from "react";
import useActiveSubPagesHook from "../../hooks/useActiveSubPageHook";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import Card from "../../components/Card/Card";
import ScraperFrame from "../../components/ScraperFrame/ScraperFrame";
import { GlobalStateContext } from "../../store/GlobalState";
import useFetch from "../../hooks/useFetch";
import ScriptCardContainer from "../../components/ScriptCardContainer/ScriptCardContainer";
import Table from "../../components/Table";
import useToggleCardHook from "../../hooks/useToggleCardHook";
import ToggleCardData from "../../components/ToggleCardData/ToggleCardData";



export default function ScraperScripts({children}) {
    
    const isActive = useActiveSubPagesHook("Scraper Scripts");

    const [GlobalState] = useContext(GlobalStateContext);

    const {activeCardClassName, toggleCardParentClassName, toggleClickHandler} = useToggleCardHook();

    const {data : scraperScripts} = useFetch("/api/modules/scripts");

    const tableRowClickHandler = (script, e) => {
        toggleClickHandler()
    }

    
    useEffect(() => {
        // console.log(scraperScripts);
    }, [scraperScripts]);
    
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
                    <ToggleCardData className={activeCardClassName}></ToggleCardData>
                    
                    </EmptyCard>
                </EmptyCard>
            }
        </>
        
    );
}