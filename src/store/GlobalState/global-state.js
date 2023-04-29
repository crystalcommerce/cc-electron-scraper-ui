import { generateUuid } from "../../utilities";



export const globalState = {
    AppWindowId : null,
    AppWindow : {
        isOnFullScreen : false,
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
        // {
        //     windowId : null,
        //     parentWindowId : null,
        //     dimensions : {},
        //     componentId : "ScraperFrame",
        //     element : null,
        //     toggleClassName : null,
        //     hidden : false,
        // }
    ],
    BrowserWindows : [
        {
            windowId : null,
            windowType : "scraper" || "browser",
            scraperType : "singleProduct" || "productSets" || "categorizedSets",
            parentWindowId : null,
            dimensions : {}
        }
    ],
    ScraperWindows : [
        {
            windowId : null,
            type : "single" || "set" || "categorized-set",
            parentWindowId : null,
            dimensions : {},
            
        }
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
            id : generateUuid(),
        },
        {
            label : "Internet",
            page : "Internet Browser",
            location : "header",
            id : generateUuid(),
        },
        {
            label : "Scraper",
            page : "Scraper Frame",
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
    ],
};