import React from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../hooks/useAuth';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/slices/authSlice';

const Header: React.FC = () => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

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

                    {/* Navigation Links */}
                    <div className=" md:flex md:items-center md:space-x-8">
                        <Link to="/" className="text-gray-900 hover:text-indigo-600 font-medium">Home </Link>
                        {isAuthenticated && (
                            <Link to="/dashboard" className="text-gray-900 hover:text-indigo-600 font-medium">Favourites</Link>
                        )}

                        {isAuthenticated ? (
                            <button onClick={handleLogout} className="bg-gray-900 text-gray-100 p-2 hover:text-red-600 font-medium">
                                Logout
                            </button>
                        ) : <></>}
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;
