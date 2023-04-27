import { generateUuid } from "../../utilities";

export const globalState = {
    AppWindowId : null,
    FrameWindow : {
        windowId : null,
        parentWindowId : null,
        dimensions : {}
    },
    BrowserFrames : [
        {
            windowId : null,
            type : "single" || "multi",
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
            label : "Browser Frame",
            page : "Browser Scraper",
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
            label : "Browser Frame",
            page : "Browser Scraper",
            isActive : true,
        }
    ],
};