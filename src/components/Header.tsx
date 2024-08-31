import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logout, loading} from '../redux/slices/auth/authSlice';
import {useAccount, useConnect, useDisconnect} from "wagmi";
import {useAppSelector} from "../hooks/useAuth";
import {connectAction} from "../redux/slices/auth/authActions";


const Header: React.FC = () => {
    const storeAuthStatus = useAppSelector(state => state.auth.status);
    const dispatch = useDispatch();

    const {connectors, connectAsync, status} = useConnect();
    const {disconnectAsync} = useDisconnect();
    const account = useAccount();

    const handleLogout = async () => {
        await disconnectAsync();
        dispatch(logout());
    };

    const handleLogin = async (connector) => {
        await connectAsync({connector});
        dispatch(connectAction());
    };

    useEffect(() => {
        if (storeAuthStatus == 'disconnected' && account.status === 'connected') {
            dispatch(connectAction(account));
        }
    }, [dispatch, storeAuthStatus, account]);

    useEffect(() => {
        if (status.includes("connecting")) {
            dispatch(loading());
        }
    }, [dispatch, status]);

    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-indigo-600">
                            Beans Love Bears
                        </Link>
                    </div>


                    <div className="flex md:space-x-8 items-stretch">
                        <Link to="/" className="content-center text-gray-900 hover:text-indigo-600 font-medium">Home </Link>
                        {account.status === 'connected' && (
                            <Link to="/favourites" className="text-gray-900 hover:text-indigo-600 font-medium content-center">Favourites</Link>
                        )}
                        <div className="text-gray-900 flex items-center gap-2 border-l border-gray-500 border-dashed pl-8">
                            {account.status === 'connected' ? (
                                <button onClick={handleLogout} className="bg-gray-100 p-1 hover:text-red-600 font-medium">
                                        Logout
                                </button>
                            ) :
                                <>
                                    <h2>Connect with: </h2>
                                    {connectors.map((connector) => (
                                        <button
                                            className="p-1 hover:text-red-600 font-medium"
                                            key={connector.uid}
                                            onClick={() => handleLogin(connector)}
                                            type="button"
                                        >
                                            {connector.name}
                                        </button>
                                    ))}
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
/**/
export default Header;
