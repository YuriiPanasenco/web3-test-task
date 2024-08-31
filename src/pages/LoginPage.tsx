import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import LoadingSpinner from "../components/ui-kit/LoadinSpinner";


const LoginPage: React.FC = () => {
    const status: string = useSelector((state: RootState) => state.auth.status);

    return (
        <div className="text-gray-800 font-medium max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-center">
            {(status == 'loading') ?
                (<LoadingSpinner/>) :
                <>Login to get access to the functionality</>
            }
        </div>
    );
};


export default LoginPage;
