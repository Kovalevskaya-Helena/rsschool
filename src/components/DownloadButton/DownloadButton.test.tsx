import { expect, test, describe, vi, type MockedFunction } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { DownloadButton } from '.';
import { Item } from '../../helpers/types';
import { convertToCSV } from '../../helpers/convertToCSV';

vi.mock('../../helpers/convertToCSV');

describe('DownloadButton', async () => {
  test('Render the button', async () => {
    const mockItems: Item[] = [];
    (convertToCSV as MockedFunction<typeof convertToCSV>).mockReturnValue('');

    const { getByRole } = render(<DownloadButton items={mockItems} />);
    getByRole('button');

    await fireEvent.click(getByRole('button'));

    expect(convertToCSV).toHaveBeenCalledWith(mockItems, ';');
  });
});
