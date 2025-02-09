export const parseId = (url: string) => {
  return url.split('/').at(-2);
};
