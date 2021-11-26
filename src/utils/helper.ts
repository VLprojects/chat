export const getLeadingLetters = (name: string, count = 2): string =>
  name
    .split(/(\s+)/)
    .filter((word) => /\S/.test(word))
    .slice(0, count)
    .map((word) => word[0])
    .join('');
