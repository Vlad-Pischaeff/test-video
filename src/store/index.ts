import { configureStore } from '@reduxjs/toolkit';
import { fragmentsApi } from './api/fragmentsApi';
import uiReducer from './slices/ui';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        [fragmentsApi.reducerPath]: fragmentsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(fragmentsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;