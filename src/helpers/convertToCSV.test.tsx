import { convertToCSV } from './convertToCSV';
import { Item } from './types';

describe('convertToCSV', () => {
  test('returns correct csv structure', () => {
    const mockItems: Item[] = [
      {
        name: 'John',
        gender: 'male',
        birth_year: '13.01.1000',
        height: '132',
        mass: '132',
        eye_color: 'blue',
        url: '/13223',
      },
      {
        name: 'Jane',
        gender: 'female',
        birth_year: '13.02.1900',
        height: '10',
        mass: '13',
        eye_color: 'green',
        url: '/13223',
      },
    ];

    const expectedCSV =
      'name,gender,birth_year,height,mass,eye_color,url\nJohn,male,13.01.1000,132,132,blue,/13223\nJane,female,13.02.1900,10,13,green,/13223';
    const result = convertToCSV(mockItems);

    expect(result).toBe(expectedCSV);
  });
});
