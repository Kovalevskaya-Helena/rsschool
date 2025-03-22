import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

type Status = 'idle' | 'loading' | 'success' | 'error';

export interface Country {
  name: Record<string,string>,
  population: number,
  region: string,
  flags: Record<string,string>,
}

interface CountriesState {
  countries: Country[],
  status: Status,
  error: unknown | null;

}

const initialState: CountriesState = {
  countries: [],
  status: 'idle',
  error: null,
};

export const fetchAllCountries = createAsyncThunk(
  'countries/fetchAllCountries',
  async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    return response.json();
  }
);

export const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllCountries.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllCountries.fulfilled, (state, action:PayloadAction<Country[]>) => {
        state.status = 'success';
        state.countries = action.payload;
        state.error = null;
      })
      .addCase(fetchAllCountries.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload
      });
  },
});

export const getAllCountries = (state: RootState) => state.countries.countries;

export default countrySlice.reducer;
