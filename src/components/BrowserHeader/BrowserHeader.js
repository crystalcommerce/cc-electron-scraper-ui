import React from "react";
import BrowserTabs from "../BrowserTabs/BrowserTabs";
import BrowserAddressBarContainer from "../BrowserAddressBarContainer/BrowserAddressBarContainer";

export default function BrowserHeader() {

    return (
        <div className="cc-browser-header-container">
            <BrowserTabs />
            <BrowserAddressBarContainer></BrowserAddressBarContainer>
        </div>
        
    )
}