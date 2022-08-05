import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fragmentsApi } from "@store/api/fragmentsApi";
import { RootState } from "..";
import { IFragment, IRect, IStyles, UIType } from "@assets/Types/Types";
const RATIO = 640/1280;

const initialState: UIType = {
    currentTime: null,
    normData: [ 
        {
            id: 0,
            timestamp: 0,
            duration: 0,
            zone: { left: 0, top: 0, height: 0, width: 0 },
            completed: false,
        }
    ],
    rectArr: [ ]
}

const slice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        resetTime: (state) => {
            state.currentTime = null;
        },
        setTime: (state, { payload }: PayloadAction<number>) => {
            state.currentTime = payload;
        },
        setCompleted: (state, { payload }: PayloadAction<number>) => {
            const index = state.normData.findIndex(n => n.id === payload);
            state.normData[index].completed = true;
            // рисуем прямоугольник
            let newRect: IStyles = {
                left: state.normData[index].zone.left * RATIO + "px",
                top: state.normData[index].zone.top * RATIO + "px",
                width: state.normData[index].zone.width * RATIO + "px",
                height: state.normData[index].zone.height * RATIO + "px",
            };
            let element: IRect = {
                id: payload,
                rect: newRect
            };
            // добавляем прямоугольник в массив
            state.rectArr.push(element);
        },
        resetCompleted: (state, { payload }: PayloadAction<number>) => {
            const index = state.normData.findIndex(n => n.id === payload);
            state.normData[index].completed = false;
            // удаляем прямоугольник из массива
            let arr = state.rectArr.filter(n => n.id !== payload);
            state.rectArr = arr;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher( 
            fragmentsApi.endpoints.getFragments.matchFulfilled,
            (state, { payload }) => {
                let newdata: IFragment[] = JSON.parse(JSON.stringify(payload));
                newdata.forEach(n => {
                    n.completed = false;
                    n.duration = n.duration / 1000;
                    n.timestamp = n.timestamp / 1000;
                });
                newdata.sort((a, b) => a.timestamp - b.timestamp);
                state.normData = newdata;
            },
        )
    },
});

export const { resetTime, setTime, setCompleted, resetCompleted } = slice.actions;

export default slice.reducer;

export const selectUI = (state: RootState) => state.ui;