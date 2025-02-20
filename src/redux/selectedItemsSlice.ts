import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../helpers/types';

interface SelectedItemsState {
  selectedItems: Record<string, Item>;
}

const initialState: SelectedItemsState = {
  selectedItems: {},
};

export const checkboxSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<Item>) => {
      const id = action.payload.url;

      if (id in state.selectedItems) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete state.selectedItems[id];
      } else {
        state.selectedItems[id] = action.payload;
      }
    },
  },
});

export const { toggleItem } = checkboxSlice.actions;
export default checkboxSlice.reducer;
