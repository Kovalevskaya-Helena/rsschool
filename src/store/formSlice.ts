import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { countries } from './countries';

const initialFormData = {
  terms: false,
  country: 'n/a',
  gender: 'n/a',
  cpassword: 'n/a',
  password: 'n/a',
  email: 'n/a',
  age: 0,
  name: 'n/a',
  image: 'https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?fit=512%2C512&ssl=1'
}

const initialState = {
  draft:initialFormData,
  commited:initialFormData,
  countries: countries,
};

const formSlice = createSlice({
  name:'form',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.draft = action.payload;
    },
    updateCommited: (state) => {
      state.commited = { ...state.draft };
      state.draft = { ...initialFormData };
    }
  }
});

export const getFormDataDraft = (state:RootState) => state.form.draft;

export const getFormDataCommited = (state:RootState) => state.form.commited;

export const getCountries = (state:RootState) => state.form.countries;

export const { updateFormData, updateCommited } = formSlice.actions;

export default formSlice.reducer;
