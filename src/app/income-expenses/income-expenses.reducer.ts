import { createReducer, on } from '@ngrx/store';
import { EntryExit } from '../models/entry-exit.model';
import { setItems, unSetItems } from './income-expenses.actions';

export interface EntryExitState {
    items: EntryExit[];
}

export const initialState: EntryExitState = {
    items: [],
}

const _entryExitReducer = createReducer(initialState,

    on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(unSetItems, (state) => ({ ...state, items: [] })),

);

export function entryExitReducer(state: any, action: any) {
    return _entryExitReducer(state, action);
}