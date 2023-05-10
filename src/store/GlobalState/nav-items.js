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
            id : generateUuid(),
        },
        {
            label : "Scraper Scripts",
            parentPage : "Manage Scraper",
            page : "Scraper Scripts",
            id : generateUuid(),
        },
        {
            label : "Create Scraper Scripts",
            parentPage : "Manage Scraper",
            page : "Create Scraper Scripts",
            id : generateUuid(),
        },

        {
            label : "Create User",
            parentPage : "Manage Users",
            page : "Create User",
            id : generateUuid(),
        },
        {
            label : "Delete User",
            parentPage : "Manage Users",
            page : "Delete User",
            id : generateUuid(),
        },
    ],
}