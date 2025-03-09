import { filterObjectKeys } from './filterObjectKeys';

describe('filterObjectKeys', () => {
  test('Should correct apply a filter function', () => {
    const object = { id: '222', name: 'alex', age: '33' };

    const result = filterObjectKeys(object, (key) => key !== 'age');

    expect(result).toEqual({ id: object.id, name: object.name });
  });
});
