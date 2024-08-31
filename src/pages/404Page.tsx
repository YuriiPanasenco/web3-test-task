import React from 'react';
import PageTemplate from "./PageTemplate";
import {Exception} from "../dto/Exception";


function Page404(): React.JSX {

    return (
        <PageTemplate error={new Exception("Page not found")}/>
    );
}

export default Page404;

