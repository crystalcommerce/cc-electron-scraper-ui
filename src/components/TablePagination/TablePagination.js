import React from "react";
import { Typography } from "@mui/material/";
import Select from "../Select";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import useTablePaginationHook from "../../hooks/useTablePaginationHook";


export default function TablePagination({rows, rowsPerPageOptions, onPageChange, onRowsPerPageChange, defaultPage})  {

    const {rowsPerPageChangeHandler, pageChangeHandler, page, count, rowsPerPage, rowsPerPageOptions : modifiedRowsPerPageOptions} =  useTablePaginationHook({rows, rowsPerPageOptions, onPageChange, onRowsPerPageChange})

    return (

        <div className="cc-flex cc-row center-right gapped" style={{padding: "1rem 0 1rem"}}>
            <div className="cc-flex cc-row center gapped">
                <Typography>Rows Per Page :</Typography>
                <Select 
                    options={modifiedRowsPerPageOptions} 
                    uniqueProp="value" 
                    optionLabelProp="label" 
                    selectOnchangeHandler={rowsPerPageChangeHandler}
                    defaultValue={rowsPerPage}
                    className="table-pagination"
                ></Select>
            </div>
            <div>
                <Stack spacing={2}>
                    <Pagination page={page} count={count} defaultPage={defaultPage || 3} onChange={pageChangeHandler} />
                </Stack>
            </div>
        </div>

    );
    
}
