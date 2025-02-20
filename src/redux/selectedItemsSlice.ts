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

      if (id in state) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete state[id];
      } else {
        state[id] = action.payload;
      }
    },
    unSelectAllItems: () => {
      return {};
    },
  },
});

export const getSelectedItems = (state: RootState) => state.selectedItems;

export const { toggleItem, unSelectAllItems } = checkboxSlice.actions;
export default checkboxSlice.reducer;
