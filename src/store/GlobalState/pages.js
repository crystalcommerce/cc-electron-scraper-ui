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
            isActive : true,
        },
    ]
}