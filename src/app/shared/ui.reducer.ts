import { Action, createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.action';

export interface UiState {
    isLoading: boolean;
}

export const initialState: UiState = {
    isLoading: false,
}

const _uiReducer = createReducer(initialState,

    on(isLoading, state => ({ ...state, isLoading: true })),
    on(stopLoading, state => ({ ...state, isLoading: false })),

);

export function uiReducer(state: UiState | undefined, action: Action) {
    return _uiReducer(state, action);
}