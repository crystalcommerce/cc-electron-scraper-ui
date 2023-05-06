import React, { useContext } from "react";
import { GlobalStateContext } from "../../store/GlobalState";
import Card from "../Card/Card";
import BrowserAddressBar from "../BrowserAddressBar/BrowserAddressBar";

export default function BrowserAddressBarContainer()    {

    const [GlobalState] = useContext(GlobalStateContext);

    return (
        <Card className={"browser-address-bar no-padding no-shadow"} noFlex >
            {
                GlobalState.BrowserTabs.map(item => {
                    return (
                        <div key={item.browserWindowId} className={!item.isActive ? "hidden" : ""}>
                            {
                                item.isActive && 
                                <BrowserAddressBar browserWindowId={item.browserWindowId}></BrowserAddressBar>
                            }
                        </div>
                    )
                })
            }
        </Card>
    )
}