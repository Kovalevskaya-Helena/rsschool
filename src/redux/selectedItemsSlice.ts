import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../helpers/types';
import { RootState } from './store';

const initialState: Record<string, Item> = {};

export const checkboxSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<Item>) => {
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
