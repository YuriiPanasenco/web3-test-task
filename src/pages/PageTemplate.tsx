import React from 'react';
import Header from "../components/Header";
import {useAppSelector} from "../hooks/useAuth";
import LoginPage from "./LoginPage";
import Opps from "../components/Opps";

type PageTemplateType = {
    error: string | null,
    loading: boolean,
    children: JSX.Element
}

const PageTemplate: React.FC<PageTemplateType> = ({children, error = false, loading = false}) => {
    const isAuthenticated = useAppSelector(state => state.auth.status == 'connected');

    let renderComponent: JSX.Element = children;

    if (loading) {
        renderComponent = (<div>Loading...</div>);
    }

    if (error) {
        renderComponent = (<Opps error={error}/>);
    }

    if (!isAuthenticated) {
        renderComponent = (<LoginPage/>);
    }


    return (
        <div className="min-h-screen bg-gray-100">
            <Header/>
            <main className="py-10">
                {renderComponent}
            </main>
        </div>
    );
};


export default PageTemplate;
