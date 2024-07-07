import { configureStore } from '@reduxjs/toolkit';

import baseApi, { rtkQueryErrorLogger } from './api/baseApi';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: { [baseApi.reducerPath]: baseApi.reducer },
  middleware: (gdm) => gdm({ serializableCheck: false }).concat(baseApi.middleware).concat(rtkQueryErrorLogger)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
