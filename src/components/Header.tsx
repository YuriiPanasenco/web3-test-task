import React from 'react';
import {Link} from 'react-router-dom';
import useAuth from "../hooks/web3/useAuth";


const Header: React.FC = () => {
    const {account, connectors, handleLogin, handleLogout} = useAuth();

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
                        <Link to="/" className="content-center text-gray-900 hover:text-indigo-600 font-medium">Web2 </Link>
                        {account.status === 'connected' && (
                            <>
                                <Link to="/web3" className="text-gray-900 hover:text-indigo-600 font-medium content-center">Web3</Link>
                                <Link to="/favourites" className="text-gray-900 hover:text-indigo-600 font-medium content-center">Favourites</Link>
                            </>
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
