import {navItems} from "./nav-items";
import {pages} from "./pages";

export const globalState = {
    AppWindowId : null,
    AppWindow : {
        isOnFullScreen : false,
        isLoading : false,
        isFrameDelayedLoading : false,
        userDataPath : null,
        serverUrl : null,
    }, 
    FrameWindows : [
        // {
        //     windowId : null,
        //     parentWindowId : null,
        //     dimensions : {},
        //     componentId : "BrowserFrame",
        //     element : null,
        //     toggleClassName : null,
        //     hidden : false,
        // },
    ],
    BrowserTabs : [
        // {
        //     "AppWindowId": " 3d8c55b8ee11b1-6e",
        //     "componentId": "a261715e-8684-48fc-b42d-928366e9d2d4-browser-frame",
        //     "browserWindowId": "a263b8ca-1783-41e4-8c49-24626889ceb9",
        //     "url": "https://www.google.com/",
        //     "isActive": false,
        //     "disabled": false,
        //     "label": "Google"
        // },
        // {
        //     "AppWindowId": " 3d8c55b8ee11b1-6e",
        //     "componentId": "a261715e-8684-48fc-b42d-928366e9d2d4-browser-frame",
        //     "browserWindowId": "dd1e529e-3ce8-4f87-884f-01f62566da4d",
        //     "url": "https://www.youtube.com/",
        //     "isActive": true,
        //     "disabled": false,
        //     "label": "YouTube"
        // }
    ],
    ScraperFrames : [

    ],
    ScraperScripts : [

    ],
    ScraperWindows : [
        // {
        //     windowId : null,
        //     parentWindowId : null,
        //     type : "single" || "set" || "categorized-set",
        //     url : "",
        //     dimensions : {},
        // }
    ],
    Components : {
        AddBrowserTabButton : {
            disabled : false,
            isBlank : false,
        },
        BrowserAddressBar : {
            hidden : false,
            toggleClassName : null,
            element : null,
            disabled : false,
        },
        BrowserFrameContainer : {
            hidden : false,
            toggleClassName : null,
            element : null,
        },
        Main : {
            element : null,
            toggleClassName : "with-side-bar",
            hidden : false,
        },
        Sidebar : {
            hidden : false,
            toggleClassName : "shown",
            element : null,
        }
    },
    ...pages,
    ...navItems,
};