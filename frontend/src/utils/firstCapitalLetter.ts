export const firstCapitalLetter = (stringOfCharacters: string) => {
  const words = stringOfCharacters.split(" ");

  const wordsWithFirstCapitalLetter = words.map((word) => {
    const firstLetter = word[0].toUpperCase();

    const restOfTheLetters = word.slice(1).toLowerCase();

    return firstLetter + restOfTheLetters;
  });

  return wordsWithFirstCapitalLetter.join(" ");
};
