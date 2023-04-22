import * as React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';

export default function GlobalCssOverride() {
    return (
        <React.Fragment>
            <GlobalStyles styles={{ ["body > *"] : { all: 'initial' } }} />
        </React.Fragment>
    );
}