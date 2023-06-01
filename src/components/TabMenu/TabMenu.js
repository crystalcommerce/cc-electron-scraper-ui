import React from "react";
import { Box, Tab, Tabs } from "@mui/material";


function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function TabMenu({tabMenu, value, handleChange}) {

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="tabs">

                {
                    tabMenu.map((label, index) => {
                        return (
                            <Tab key={index} label={label} {...a11yProps(index)} />
                        )
                    })
                }

            </Tabs>
        </Box>
    )
}