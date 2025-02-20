import { Item } from '../helpers/types';

export const convertToCSV = (
  data: { [key: string]: Item },
  separator = ','
): string => {
  const headers = Object.keys(Object.values(data)[0]).join(separator);

  const rows = Object.values(data).map((item) =>
    Object.values(item).join(separator)
  );

  return [headers, ...rows].join('\n');
};
