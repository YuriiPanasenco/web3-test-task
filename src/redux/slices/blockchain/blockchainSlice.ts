import {createSlice, PayloadAction, createAsyncThunk, ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {ethers} from 'ethers';


interface BlockchainState {
    balance: string;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: BlockchainState = {
    balance: '0',
    status: 'idle',
};

export const fetchBalance = createAsyncThunk<string, string>(
    'blockchain/fetchBalance',
    async (address: string, {rejectWithValue}) => {
        try {
            if (!address) throw new Error('Address not provided');
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const balance = await provider.getBalance(address);
            return ethers.utils.formatEther(balance);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const blockchainSlice = createSlice<BlockchainState, { [key: string]: (state: BlockchainState, action: PayloadAction) => void; }, 'blockchain'>({
    name: 'blockchain',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<BlockchainState>) => {
        builder
            .addCase(fetchBalance.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBalance.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'idle';
                state.balance = action.payload;
            })
            .addCase(fetchBalance.rejected, (state) => {
                state.status = 'failed';
            });
    },
    reducerPath: undefined,
    selectors: undefined,
});


export default blockchainSlice.reducer;
