import React, {useState} from 'react';
import TabMenu from '../TabMenu/TabMenu';
import TabPanel from '../TabPanel/TabPanel';
import { Box } from '@mui/material';




export default function TabbedContents({tabMenu, tabContents}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
        <TabMenu tabMenu={tabMenu} value={value} handleChange={handleChange}></TabMenu>
        {tabContents.map((content, index) => {
            return (
                <TabPanel key={index} value={value} index={index}>{content}</TabPanel>
            )
        })}
    </Box>
  );
}
