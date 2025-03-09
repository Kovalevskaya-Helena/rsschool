import { getSelectedItems } from './selectedItemsSlice';
import { RootState } from './store';

describe('redux', () => {
  test('getSelectedItems', () => {
    const item = {
      name: 'Luke',
      gender: 'm',
      birth_year: '10',
      height: '13',
      mass: '14',
      eye_color: 'blue',
      url: 'google.com',
    };

    const selectedItems = { [item.url]: item };

    const mockStore = { selectedItems };

    const result = getSelectedItems(mockStore as RootState);

    expect(result).toEqual(selectedItems);
  });
});
