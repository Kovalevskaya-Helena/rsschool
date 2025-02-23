import { Item } from '../helpers/types';

export const convertToCSV = (items: Item[], separator = ','): string => {
  const headers = Object.keys(items[0]).join(separator);

  const rows = items.map((item) => Object.values(item).join(separator));

  return [headers, ...rows].join('\n');
};
