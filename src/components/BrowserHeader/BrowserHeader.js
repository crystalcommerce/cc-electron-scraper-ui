import React from "react";
import BrowserAddressBar from "../BrowserAddressBar";
import BrowserTabs from "../BrowserTabs/BrowserTabs";

export default function BrowserHeader() {

    return (
        <div className="cc-browser-header-container">
            <BrowserTabs />
            <BrowserAddressBar></BrowserAddressBar>
        </div>
        
    )
}