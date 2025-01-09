import { Action } from 'redux';
import { AppDispatch, RootState } from '../../store';
import { ThunkAction } from 'redux-thunk';




export type AppThunk<ReturnType = void> = (dispatch: AppDispatch, getState: () => RootState) => ReturnType | Promise<ReturnType>;