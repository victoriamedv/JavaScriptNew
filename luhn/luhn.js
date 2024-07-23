// This is only a SKELETON file for the 'Luhn' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const valid = (str) => {
  let strCard = str.replaceAll(' ', '');
  if (strCard.length === 1) {
    return false;
  }

  // const regex = /\D/g; // \D соответствует любому символу, который не является цифрой
  const existLetters = Number.isNaN(strCard);
  if (existLetters === true) {
    return false;
  }

  if (strCard.length % 2 === 0) {
    strCard = `0${strCard}`;
  }

  let sum = 0;

  for (let i = strCard.length - 1; i >= 0; i -= 1) {
    const element = strCard[i];
    let numberElement = Number(element);
    if ((i + 1) % 2 === 0) {
      numberElement *= 2;
      if (numberElement > 9) {
        numberElement -= 9;
      }
    }
    sum += numberElement;
  }

  if (sum % 10 !== 0) {
    return false;
  }
  return true;
};
