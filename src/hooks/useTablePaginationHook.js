import React, { useState, useEffect } from "react";

export default function useTablePaginationHook({rows, rowsPerPageOptions, onPageChange, onRowsPerPageChange,}) {
    rowsPerPageOptions = Array.isArray(rowsPerPageOptions) && rowsPerPageOptions.length ? rowsPerPageOptions : [5, 10, 25];
    rowsPerPageOptions = rowsPerPageOptions.map(item => {
        return { label : item, value : item}
    });

    const [totalRows, setTotalRows] = useState(rows.length || 0);
    const [page, setPage] =  useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[1]);
    const [count, setCount] = useState(0);



    const rowsPerPageChangeHandler = (selectedOption) => {
        let newRowsPerPage = Number(selectedOption.value),
            startingIndex = (rowsPerPage.value * (page - 1)),
            newPage = Math.ceil((startingIndex + 1) / newRowsPerPage);

        onRowsPerPageChange(newRowsPerPage, newPage);
        
        setPage(newPage);
        onPageChange(newPage);
        setRowsPerPage(state => selectedOption);
        setCount(state => Math.ceil(totalRows / newRowsPerPage))
    }

    const pageChangeHandler = (e, page) => {
        setPage(page);
        onPageChange(page);
    }    

    useEffect(() => {
        
        if(totalRows > 0)   {
            setCount(state => Math.ceil(totalRows / rowsPerPage.value));
        }

        if(rows.length !== totalRows)   {
            setTotalRows(state => rows.length);
        }


        if(Math.ceil(totalRows / rowsPerPage.value) < page)    {
            setPage(state => count);
            onPageChange(count);
            console.log({count, page, totalRows});

        }

    }, [totalRows, rows, count, page]);


    return {rowsPerPageChangeHandler, rowsPerPageOptions, pageChangeHandler, page, count, rowsPerPage} ;
}