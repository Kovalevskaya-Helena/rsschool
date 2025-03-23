import { configureStore } from '@reduxjs/toolkit';
import CountryReducer from './countrySlice';

export const store = configureStore({
  reducer: {
    countries: CountryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
