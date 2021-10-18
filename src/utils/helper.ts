export const getLeadingLetters = (name: string, count = 2): string =>
  name
    .split(' ')
    .map((item) => item[0].toUpperCase())
    .join('')
    .slice(0, count);
