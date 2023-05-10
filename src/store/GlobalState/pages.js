export const pages =  {
    Pages : [
        {
            label : "Home",
            page : "Home",
            isActive : false,
        },
        {
            label : "Scraper",
            page : "Manage Scraper",
            isActive : true,
        },
        {
            label : "Internet",
            page : "Internet Browser",
            isActive : false,
        },
        {
            label : "Users",
            page : "Manage Users",
            isActive : false,
        },
    ],
    SubPages : [
        {
            label : "Scraped Data",
            parentPage : "Manage Scraper",
            page : "Scraped Data",
            isActive : false,
        },
        {
            label : "Create Scraper Scripts",
            parentPage : "Manage Scraper",
            page : "Create Scraper Scripts",
            isActive : false,
        },
        {
            label : "Scraper Scripts",
            parentPage : "Manage Scraper",
            page : "Scraper Scripts",
            isActive : true,
        },

        {
            label : "Create User",
            parentPage : "Manage Users",
            page : "Create User",
            isActive : true,
        },
        {
            label : "Delete User",
            parentPage : "Manage Users",
            page : "Delete User",
            isActive : false,
        },
    ]
}