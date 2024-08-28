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
            className="text-gray-100 hover:text-red-600 font-medium"
        >
            Login
        </button>
    );
};


export default LoginPage;
