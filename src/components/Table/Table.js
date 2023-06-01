import React from 'react';

// mui components
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material/';

// custom components
import TablePagination from '../TablePagination';
import DropdownButton from '../DropdownButton';
import EmptyCard from '../EmptyCard';
import Modal from '../Modal';

// we need to have a modal;
// modal will open the following:
// View Product;
// Edit Product;

// utils
// import {createColumns, getAllObjectKeys} from "../utilities";
import NativeImage from '../NativeImage/NativeImage';
import useTableHook from '../../hooks/useTableHook';
import TableImage from '../TableImage/TableImage';

export default function StickyHeadTable(props) {

    const {
        tableCaption, 
        tableData, 
        excludedProps, 
        styledColumnObjects, 
        showActionButtons, 
        tableRowClickHandler, 

        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        uniqueDataProp,
        data,
        columns,
        rows,
        modalOpen,
        closeModalHandler,
        rowActionButtons
        
    } = useTableHook({
        tableCaption : props.tableCaption, 
        tableData : props.tableData, 
        excludedProps : props.excludedProps, 
        uniqueDataProp : props.uniqueDataProp, 
        styledColumnObjects : props.styledColumnObjects, 
        showActionButtons : props.showActionButtons, 
        showIndex : props.showIndex, 
        tableRowClickHandler : props.tableRowClickHandler,
    });

    return (
        <>
            {modalOpen && 
                <Modal open={modalOpen} closeModalHandler={closeModalHandler}>{}</Modal>
            }
            <Paper sx={{ width: '100%', backgroundColor : "#1e1e1e" }}>
                <EmptyCard style={{backgroundColor : "rgb(58 67 70)", padding : ".5rem 1rem"}} className="cc-flex cc-row center gapped-1 space-between">
                    <Typography variant="h4">{tableCaption}</Typography>
                    <Typography>Total Rows : <Typography variant="span">{rows.length}</Typography></Typography>
                </EmptyCard>
                
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column, index) => (
                            <TableCell
                            key={`${column.id}-${index}`}
                            align="center"
                            style={column.style}
                            >{column.label}</TableCell>
                        ))}
                        {showActionButtons ?
                            <TableCell
                                key={`actions-${columns.length}`}
                                align="center"
                            ><Typography>{"Actions"}</Typography></TableCell> : null
                        }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                            return (
                            <TableRow className="cc-pointer" onClick={tableRowClickHandler.bind(this, row[uniqueDataProp])} hover role="checkbox" tabIndex={-1} key={`${row[uniqueDataProp]}${index}`}>
                                {columns.map((column) => {

                                    

                                    let value = row[column.id];
                                    if(typeof value === "boolean") {
                                        value = value ? "true" : "false";
                                    }

                                    if(column.id === "scrapedImages")   {
                                        
                                        // show images here...

                                        value = row.imageUris.map((item, index) => {
                                            return <NativeImage key={`${index}-${item}`} src={item} />
                                        });

                                        // value = <TableImage imageUris={row.imageUris}></TableImage>
                                    }


                                    return (
                                        <TableCell key={`${column.id}-${index}`} align={column.align || "center" || "justify"}>
                                            {column.format && typeof value === 'number'
                                                ? column.format(value)
                                                : value}
                                        </TableCell>
                                    );
                                    
                                })}
                                {showActionButtons ? 
                                    <TableCell
                                        key={`actions-${index}`}
                                        align="center"
                                        sx={{minWidth : 250}}
                                    ><DropdownButton
                                        dropdownOptions={rowActionButtons.map(dropdownOption => {
                                            let {optionClickHandler} = dropdownOption,
                                                foundData = data.find(item => item[uniqueDataProp] === row[uniqueDataProp]);

                                            optionClickHandler = optionClickHandler.bind(this, foundData);

                                            return {...dropdownOption, optionClickHandler};
                                        })}
                                        size="medium"
                                        style={{whiteSpace : "nowrap"}}
                                    /></TableCell> : null
                                }
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                    
                </TableContainer>
                {
                    rows && rows.length && 
                    <TablePagination
                        rows={rows}
                        rowsPerPageOptions={[5, 10, 25, 50, 100, 500, 1000]}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                }
                
            </Paper>
            
        </>
    );
}
