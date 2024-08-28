import React from 'react';
import {useDispatch} from "react-redux";
import {login} from "../redux/slices/authSlice";

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(login());
    };

    return (
        <button
            onClick={handleLogin}
            className="bg-gray-900 text-gray-100 p-2 hover:text-red-600 font-medium"
        >
            Login
        </button>
    );
};


export default LoginPage;
