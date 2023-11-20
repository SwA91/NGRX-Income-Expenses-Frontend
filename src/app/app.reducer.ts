import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as entryExit from './income-expenses/income-expenses.reducer';

export interface AppState {
    ui: ui.UiState,
    user: auth.AuthState,
    entryExit: entryExit.EntryExitState
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.uiReducer,
    user: auth.authReducer,
    entryExit: entryExit.entryExitReducer,
}