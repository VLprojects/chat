import Poll from 'keystone/chat/poll';

export const getLeadingLetters = (name: string, count = 2): string =>
  name
    .split(/(\s+)/)
    .filter((word) => /\S/.test(word))
    .slice(0, count)
    .map((word) => word[0])
    .join('');

export const getPollType = (poll?: Poll): 'poll' | 'test' | 'pollOpenEnded' | undefined => {
  if (poll?.withAnswer) return 'poll';
  if (poll?.isOpenEnded) return 'pollOpenEnded';
  if (!poll?.withAnswer && !poll?.isOpenEnded) return 'test';
};

export const sortPollDesc = (a: Poll, b: Poll) => +b.id - +a.id;
