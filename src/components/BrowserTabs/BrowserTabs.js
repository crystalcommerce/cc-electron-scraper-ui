import React, { useContext } from "react";
import EmptyCard from "../EmptyCard";
import { GlobalStateContext } from "../../store/GlobalState";
import useBrowserTabsHook from "../../hooks/useBrowserTabsHook";
import BrowserTab from "../BrowserTab";

export default function BrowserTabs()   {

    const [GlobalState] = useContext(GlobalStateContext);

    const {setActiveBrowserTab, addNewBrowserTab, removeBrowserTab} = useBrowserTabsHook();

    return (
        <EmptyCard className="cc-flex cc-row cc-browser-tabs no-padding">
            {

                GlobalState.BrowserTabs.map(item => {
                    return (
                        <BrowserTab 
                            icon={item.icon} 
                            label={item.label} 
                            className={GlobalState.BrowserTabs.find(itm => item.browserWindowId === itm.browserWindowId).isActive ? "active-tab" : ""} key={item.browserWindowId} 
                            disabled={GlobalState.BrowserTabs.find(itm => item.browserWindowId === itm.browserWindowId).isActive}
                            onClick={(e) => setActiveBrowserTab(e, item.browserWindowId)} 
                            onClose={(e) => removeBrowserTab(e, item.browserWindowId)} 
                        />
                    );
                })

            }
            <BrowserTab onClick={addNewBrowserTab} addButton={true}></BrowserTab>
        </EmptyCard>
    )
}