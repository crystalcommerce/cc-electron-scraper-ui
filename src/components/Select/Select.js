import React, { useState, useEffect, useRef } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import InputAdornment from '@mui/material/InputAdornment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';



export default function Select({label, selectId, options, uniqueProp, optionLabelProp, selectOnchangeHandler, size, className, defaultValue})    {

    size = size ? size : "small";

    const [selectedOption, setSelectedOption] = useState(defaultValue || {label : ""});//useState({value : "", label : "--Select--"});
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);
    const paddingPerSize = {
        small : "4px 10px",
        medium : "6px 16px",
        large : "8px 22px",
    };
    const paddingValue = paddingPerSize[Object.keys(paddingPerSize).find(key => key === size)];

    const handleMenuItemClick = (e, selectedItem) => {
		setSelectedOption(prev => selectedItem);
        selectOnchangeHandler(selectedItem)
		setOpen(false);
	};

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		setOpen(false);
	};

    useEffect(() => {
        let index = options.findIndex(item => item[uniqueProp] === selectedOption[uniqueProp]);

        // console.log(selectedOption);

        setSelectedIndex(state => {
            return index;
        });
        
    }, [selectedOption])

    return (
        <>
            <FormControl  className="cc-flex cc-row stretch">
                <TextField variant="outlined" className={`${className} cc-select`} id={selectId} size={size} label={label} ref={anchorRef} value={selectedOption[optionLabelProp]} onClick={handleToggle}
                    InputProps={{
                        readOnly: true,
                        endAdornment: <InputAdornment position="end">{!open && <ArrowDropDownIcon sx={{pointerEvents : "none"}} />}{open && <ArrowDropUpIcon sx={{pointerEvents : "none"}} />}</InputAdornment>,
                    }}
                />
                <Popper sx={{zIndex : 5}} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement="bottom-start">
				{({ TransitionProps, placement }) => (
					<Grow
					{...TransitionProps}
					style={{
						transformOrigin: placement === 'bottom' ? 'top-start' : 'bottom-start',
					}}
					>
                        <Paper sx={{backgroundColor : "#3d4b54"}} >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" size={size} >
                                    {options.length > 0 && options.map((item, index) => {
                                        return (
                                            // <option key={item[uniqueProp]} value={item[uniqueProp]}>{item[optionLabelProp]}</option>
                                            <MenuItem
                                                key={`${item[uniqueProp]}-${index}`}
                                                selected={index === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, item)}
                                                style = {{padding : paddingValue}}
                                                disabled = {item.disabled}
                                            >
                                                {item[optionLabelProp]}
                                            </MenuItem>
                                        )
                                    })}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
					</Grow>
				)}
				</Popper>
            </FormControl>
        </>
    )
}