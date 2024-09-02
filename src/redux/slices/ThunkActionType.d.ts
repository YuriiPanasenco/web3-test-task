import {ThunkAction} from "redux-thunk";
import {RootState} from "../store";

type ThunkActionType<ReturnType, AllowedDispatchesType> = ThunkAction<Promise<ReturnType> | void, RootState, unknown, AllowedDispatchesType>;

export default ThunkActionType;