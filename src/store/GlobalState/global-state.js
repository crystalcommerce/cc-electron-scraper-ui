import { generateUuid } from "../../utilities";



export const globalState = {
    AppWindowId : null,
    AppWindow : {
        isOnFullScreen : false,
        isLoading : false,
        isFrameDelayedLoading : false,
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
        //     browserWindowId : generateUuid(),
        //     parentWindowId : null,
        //     url : "Sa dulo ng daigdig...",
        //     label : "New Tab",
        //     isActive : true,
        //     dimensions : {}, // we may not need to set this up... we can just set it up in the backend... this is just a browser...
        // }
    ],
    ScraperTabs : [
        // {
        //     windowId : null,
        //     parentWindowId : null,
        //     type : "single" || "set" || "categorized-set",
        //     url : "",
        //     dimensions : {},
        // }
    ],
    Components : {
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
    NavItems : [
        {
            label : "Home",
            page : "Home",
            location : "header",
            hasFrameWindow : false,
            id : generateUuid(),
        },
        {
            label : "Scraper",
            page : "Scraper Frame",
            hasFrameWindow : true,
            location : "header",
            id : generateUuid(),
        },
        {
            label : "Internet",
            page : "Internet Browser",
            hasFrameWindow : true,
            location : "header",
            id : generateUuid(),
        },
        {
            label : "Users",
            page : "Manage Users",
            hasFrameWindow : false,
            location : "header",
            id : generateUuid(),
        },
        // {
        //     label : "Some other page",
        //     page : "Some Page",
        //     location : "header",
        //     id : generateUuid(),
        // },
    ],
    Pages : [
        {
            label : "Home",
            page : "Home",
            isActive : false,
        },
        {
            label : "Internet",
            page : "Internet Browser",
            isActive : true,
        },
        {
            label : "Scraper",
            page : "Scraper Frame",
            isActive : false,
        },
        {
            label : "Users",
            page : "Manage Users",
            isActive : false,
        }
    ],

};