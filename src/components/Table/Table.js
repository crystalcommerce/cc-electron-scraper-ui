import React, {useState, useEffect} from 'react';

// mui components
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material/';
import { DeleteOutlineOutlined as DeleteOutlineOutlinedIcon, EditOutlined as EditOutlinedIcon, PreviewOutlined as PreviewOutlinedIcon, PlaylistRemove as PlaylistRemoveIcon } from '@mui/icons-material/';

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
import { createColumns, getAllObjectKeys } from '../../utilities';

export default function StickyHeadTable({tableCaption, tableData, excludedProps, uniqueDataProp, styledColumnObjects, showActionButtons, showIndex, tableRowClickHandler}) {

    tableCaption = tableCaption || "Data Table";

    tableData = tableData ? tableData : [];

    excludedProps = excludedProps || [];

    styledColumnObjects = styledColumnObjects || [];

    showActionButtons  = showActionButtons || false;

    /*
        Pagination configurations;
    */
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const handleChangePage = (newPage) => {
        setPage(state => newPage - 1);
    };

    const handleChangeRowsPerPage = (newRowsPerPage, newPage) => {
        setRowsPerPage(state => newRowsPerPage);
        setPage(state => newPage);
    };


    /*
        Table data configurations;
    */
    const [data, setData] = useState(tableData);
    const columnKeys = getAllObjectKeys(data).filter(item => !excludedProps.includes(item));
    const columns = createColumns(columnKeys, styledColumnObjects, showIndex);
    const [rows, setRows] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const [modalContent, setModalContent] = useState("");
    

    const closeModalHandler = () => {
        setModalOpen(false);
    }


    useEffect(() => {
        setRows(state => {
            return data.map((item, index) => {
                let obj = {};
                if(showIndex)   {
                    obj.index = index + 1;
                }
                return columnKeys.reduce((a, b) => {
                    a[b] = item[b];
                    return a;
                }, obj);
            });
        });
    }, [data]);
    
    /*
        Row Action Buttons;
    */
    const rowActionButtons=[
        {
            label : "View",
            dropdownLabel : "View Product Data",
            size : "medium",
            action : "view",
            color : "info",
            icon : <PreviewOutlinedIcon></PreviewOutlinedIcon>,
            optionClickHandler : (foundData) => {
                // console.log(data);
                // console.log(`View data with unique id of ${foundData[uniqueDataProp]}`);

                setModalOpen(true);
                setModalContent(state => {
                    return (
                        <>
                            <pre style="font-family: monospace;">
                                {JSON.stringify(foundData, null, 4)}
                            </pre>
                        </>
                    )
                });
            }
        },
        {
            label : "Edit",
            dropdownLabel : "Edit Product Info",
            size : "medium",
            color : "secondary",
            action : "edit",
            icon : <EditOutlinedIcon></EditOutlinedIcon>,
            optionClickHandler : (foundData) => {
                console.log(`Edit data with unique id of ${foundData[uniqueDataProp]}`);
            }
        },
        {
            label : "Remove",
            dropdownLabel : "Remove From Table",
            size : "medium",
            color : "warning",
            action : "delete",
            icon : <PlaylistRemoveIcon></PlaylistRemoveIcon>,
            optionClickHandler : (foundData) => {
                setData(state => {
                    return data.filter(item => item[uniqueDataProp] !== foundData[uniqueDataProp]);
                });
            }
        },
        {
            label : "Delete",
            dropdownLabel : "Delete Permanently",
            size : "medium",
            color : "error",
            action : "delete",
            icon : <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>,
            optionClickHandler : (foundData) => {
                setData(state => {
                    return data.filter(item => item[uniqueDataProp] !== foundData[uniqueDataProp]);
                });
            }
        },
    ];

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
                            <TableRow className="cc-pointer" onClick={tableRowClickHandler.bind(this, row)} hover role="checkbox" tabIndex={-1} key={`${row[uniqueDataProp]}${index}`}>
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
