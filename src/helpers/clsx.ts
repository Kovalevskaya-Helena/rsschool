export const clsx = (...classNames: (string | false | undefined)[]): string =>
  classNames.filter(Boolean).join(' ');
