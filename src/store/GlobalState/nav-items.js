import { generateUuid } from "../../utilities";
export const navItems = {
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
            page : "Manage Scraper",
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

        
    ],
    SidebarNavItems : [
        {
            label : "Scraped Data",
            parentPage : "Manage Scraper",
            page : "Scraped Data",
            location : "sidebar",
            id : generateUuid(),
        },
        {
            label : "Scraper Scripts",
            parentPage : "Manage Scraper",
            page : "Scraper Scripts",
            location : "sidebar",
            id : generateUuid(),
        },
    ],
}