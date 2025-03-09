import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item as Person } from '../helpers/types';
import { RootState } from './store';

const initialState: Record<string, Person> = {};

export const checkboxSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<Person>) => {
      const id = action.payload.url;

      const nextItems = new Map(Object.entries(state));

      if (nextItems.has(id)) {
        nextItems.delete(id);
      } else {
        nextItems.set(id, action.payload);
      }

      return Object.fromEntries(nextItems.entries());
    },
    unSelectAllItems: () => {
      return {};
    },
  },
});

export const getSelectedItems = (state: RootState) => state.selectedItems;

export const { toggleItem, unSelectAllItems } = checkboxSlice.actions;
export default checkboxSlice.reducer;
