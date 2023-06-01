import React from "react";
import PropTypes from 'prop-types';
import { Box } from "@mui/material";

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

export default function TabPanel({children, value, index})  {
    return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          style={{
            display : "flex",
            oveflowY : "auto",
            flexGrow : "1"
          }}
        >
          {value === index && (
            <Box sx={{ p: 3 }}>
                {children}
            </Box>
          )}
        </div>
    );
}