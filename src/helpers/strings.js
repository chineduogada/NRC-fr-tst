export const truncate = (str, maxLength = 20) => {
  const s = 'michael is such an amazing child and we love him so much';

  return `${s.substring(0, maxLength)}...`;
};
