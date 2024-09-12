import React from 'react';
import { Helmet } from 'react-helmet'
import "@govbr-ds/core/dist/core-lite.css"

export default function ImportDsGovBr() {
    return(
        <Helmet>
           <script type="module" src="\core-init.js"></script>
        </Helmet>
    )
}
