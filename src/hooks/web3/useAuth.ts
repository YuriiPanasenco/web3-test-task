import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {logout, loading, login} from '../../redux/slices/auth/authSlice';
import {useAccount, useConnect, useDisconnect} from 'wagmi';
import {useAppSelector} from "../useAppSelector";


const useAuth = () => {
    const dispatch = useDispatch();
    const storeAuthStatus = useAppSelector(state => state.auth.status);
    const {connectors, connectAsync, status} = useConnect();
    const {disconnectAsync} = useDisconnect();
    const account = useAccount();

    const handleLogout = async () => {
        await disconnectAsync();
        dispatch(logout());
    };

    const handleLogin = async (connector) => {
        await connectAsync({connector});
        dispatch(login());
    };

    useEffect(() => {
        if (storeAuthStatus === 'disconnected' && account.status === 'connected') {
            dispatch(login());
        }
        if (storeAuthStatus === 'connected' && account.status === 'disconnected') {
            dispatch(logout());
        }
    }, [dispatch, storeAuthStatus, account]);

    useEffect(() => {
        if (status.includes('connecting')) {
            dispatch(loading());
        }
    }, [dispatch, status]);

    return {
        account,
        connectors,
        handleLogin,
        handleLogout,
    };
};

export default useAuth;