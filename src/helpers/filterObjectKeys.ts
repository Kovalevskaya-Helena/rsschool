const filterObjectKeys = <T extends Record<string, unknown>>(
  obj: T,
  filterFn: (key: string) => boolean
): Partial<T> =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => filterFn(key))
  ) as Partial<T>;

export { filterObjectKeys };
