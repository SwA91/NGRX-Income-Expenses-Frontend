import { createAction, props } from '@ngrx/store';
import { EntryExit } from '../models/entry-exit.model';

export const setItems = createAction(
    '[EntryExit] Set Items',
    props<{ items: EntryExit[] }>()
);

export const unSetItems = createAction('[EntryExit] Unset Items');