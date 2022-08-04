import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';

export type UIType = {
    currentItem: number;
}

const initialState: UIType = {
    currentItem: null
}

const slice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.currentItem = null;
        },
        setMessage: (state, { payload }: PayloadAction<number>) => {
            state.currentItem = payload;
        },
    }
});

export const { resetMessage, setMessage } = slice.actions;

export default slice.reducer;

export const selectUI = (state: RootState) => state.ui;