import { render, fireEvent } from '@testing-library/react';
import { DownloadButton } from '.';
import { Item } from '../../helpers/types';
import { convertToCSV } from '../../helpers/convertToCSV';

jest.mock('../../helpers/convertToCSV', () => ({
  convertToCSV: jest.fn(),
}));

describe('DownloadButton', () => {
  let createObjectURL;
  let revokeObjectURL;

  beforeAll(() => {
    createObjectURL = window.URL.createObjectURL;
    revokeObjectURL = window.URL.revokeObjectURL;

    window.URL.createObjectURL = jest.fn();
    window.URL.revokeObjectURL = jest.fn();
  });

  afterAll(() => {
    window.URL.createObjectURL = createObjectURL;
    window.URL.revokeObjectURL = revokeObjectURL;
  });

  test('Render the button', async () => {
    const mockItems: Item[] = [];
    (convertToCSV as jest.MockedFn<typeof convertToCSV>).mockReturnValue('');

    const { getByRole } = render(<DownloadButton items={mockItems} />);
    getByRole('button');

    await fireEvent.click(getByRole('button'));

    expect(convertToCSV).toHaveBeenCalledWith(mockItems, ';');
  });
});
