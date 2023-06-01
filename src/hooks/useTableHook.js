import React, {useEffect, useState} from "react";
import { DeleteOutlineOutlined as DeleteOutlineOutlinedIcon, EditOutlined as EditOutlinedIcon, PreviewOutlined as PreviewOutlinedIcon, PlaylistRemove as PlaylistRemoveIcon } from '@mui/icons-material/';
import { createColumns, getAllObjectKeys } from "../utilities";


export default function useTableHook({tableCaption, tableData, excludedProps, uniqueDataProp, styledColumnObjects, showActionButtons, showIndex, tableRowClickHandler})  {
    tableCaption = tableCaption || "Data Table";

    tableData = tableData ? tableData : [];

    excludedProps = excludedProps || [];

    styledColumnObjects = styledColumnObjects || [];

    showActionButtons  = showActionButtons || false;

    tableRowClickHandler = tableRowClickHandler ? tableRowClickHandler : () => {};

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


    useEffect(() => {
        setRows(state => {
            return data.map((item, index) => {
                let obj = {};
                obj[uniqueDataProp] = item[uniqueDataProp];
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

    return {
        tableCaption, 
        tableData, 
        excludedProps, 
        styledColumnObjects, 
        showActionButtons, 
        tableRowClickHandler, 
        uniqueDataProp,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        
        data,
        columns,
        rows,
        modalOpen,
        closeModalHandler,
        rowActionButtons
    }

}