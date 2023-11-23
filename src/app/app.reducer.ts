import { ActionReducerMap } from '@ngrx/store';
import * as auth from './auth/auth.reducer';
import { TypeStore } from './enum/shared.enum';
import * as ui from './shared/ui.reducer';

export interface AppState {
    ui: ui.UiState,
    user: auth.AuthState,
}

export const appReducers: ActionReducerMap<AppState> = {
    [TypeStore.UI]: ui.uiReducer,
    [TypeStore.USER]: auth.authReducer,
}