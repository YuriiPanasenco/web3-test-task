import {useEffect, useCallback, useState} from 'react';
import {MetaMaskInpageProvider} from '@metamask/providers';
import {useAccount} from 'wagmi';
import Web3NetworkCommunicationException from './Web3NetworkCommunicationException';

const sepoliaChainId = 11155111; // Sepolia network chain ID

const sepoliaNetworkParams = {
    chainId: `0x${sepoliaChainId.toString(16)}`, // Convert chain ID to hex format
    chainName: 'Sepolia Test Network',
    nativeCurrency: {
        name: 'Sepolia ETH',
        symbol: 'SEPETH',
        decimals: 18,
    },
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
};

export const useEnsureSepoliaNetwork = () => {
    const {chain} = useAccount();
    const [error, setError] = useState<null | Web3NetworkCommunicationException>(null);

    const switchToSepolia = useCallback(async () => {
        if (!window.ethereum) {
            setError(new Web3NetworkCommunicationException('MetaMask is not installed!'));
            return;
        }
        setError(null);
        const ethereum = window.ethereum as MetaMaskInpageProvider;

        if (chain?.id !== sepoliaChainId) {
            try {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{chainId: sepoliaNetworkParams.chainId}],
                });
                setError(null);
            } catch (switchError) {
                if (switchError?.code === 4902) {
                    try {
                        await ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [sepoliaNetworkParams],
                        });
                    } catch (addError) {
                        setError(new Web3NetworkCommunicationException('Failed to add Sepolia network to MetaMask:', addError));
                    }
                } else {
                    setError(new Web3NetworkCommunicationException('Failed to switch to Sepolia network:', switchError));
                }
            }
        }
    }, [chain?.id]);

    const handleChainChanged = useCallback((chainId: string) => {
        const newChainId = parseInt(chainId, 16);
        if (newChainId !== sepoliaChainId) {
            switchToSepolia();
        }
    }, [switchToSepolia]);

    const handleAccountsChanged = useCallback((accounts: string[]) => {
        if (accounts.length === 0) {
            setError(new Web3NetworkCommunicationException('No MetaMask accounts found.'));
        } else {
            setError(null);
        }
    }, []);

    useEffect(() => {
        if (!window.ethereum) return;
        const ethereum = window.ethereum as MetaMaskInpageProvider;


        ethereum.on('chainChanged', handleChainChanged);
        ethereum.on('accountsChanged', handleAccountsChanged);

        return () => {
            ethereum.removeListener('chainChanged', handleChainChanged);
            ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, [handleChainChanged, handleAccountsChanged]);

    useEffect(() => {
        switchToSepolia();
    }, [switchToSepolia]);

    return [error];
};