import { createReducer, on } from '@ngrx/store';
import { EntryExit } from '../models/entry-exit.model';
import { setItems, unSetItems } from './income-expenses.actions';
import { AppState } from '../app.reducer';
import { TypeStore } from '../enum/shared.enum';

export interface IncomeExpensesState {
    items: EntryExit[];
}

// extends from AppState for have this reducer
export interface AppStateWithIncomeExpenses extends AppState {
    [TypeStore.ENTRY_EXIT]: IncomeExpensesState
}

export const initialState: IncomeExpensesState = {
    items: [],
}

const _incomeExpensesReducer = createReducer(initialState,

    on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(unSetItems, (state) => ({ ...state, items: [] })),

);

export function incomeExpensesReducer(state: any, action: any) {
    return _incomeExpensesReducer(state, action);
}