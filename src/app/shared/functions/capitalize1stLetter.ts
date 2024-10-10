export const capitalize1stLetter = (words: string) => {
  const wordArray = words.split(' ');
  const capitalArray: string[] = [];
  wordArray.forEach(word => capitalArray.push(word.charAt(0).toUpperCase() + word.slice(1)));
  return capitalArray.join(' ');
};
