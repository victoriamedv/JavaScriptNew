//
// This is only a SKELETON file for the 'Rail Fence Cipher' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

import { log } from 'console';

export const encode = (text, numRails) => {
  const arrayEncode = [];
  for (let j = 0; j < numRails; j += 1) {
    arrayEncode[j] = [];
  }

  let direction = 1;
  let railIndex = 0;

  for (let k = 0; k < text.length; k += 1) {
    const char = text[k];
    arrayEncode[railIndex].push(char);
    if (railIndex === 0) {
      direction = 1;
    } else if (railIndex === numRails - 1) {
      direction = -1;
    }
    railIndex += direction;
  }
  return arrayEncode.flat().join('');
};

export const decode = (encodedText, numRails) => {
  const rails = [];
  for (let i = 0; i < numRails; i += 1) {
    rails[i] = [];
  }

  const railLengths = new Array(numRails).fill(0);
  let railIndex = 0;
  let direction = 1;

  for (let i = 0; i < encodedText.length; i += 1) {
    railLengths[railIndex] += 1;
    if (railIndex === 0) {
      direction = 1;
    } else if (railIndex === numRails - 1) {
      direction = -1;
    }
    railIndex += direction;
  }

  let startIndex = 0;
  for (let i = 0; i < numRails; i += 1) {
    const railLength = railLengths[i];
    rails[i] = encodedText.slice(startIndex, startIndex + railLength).split('');
    startIndex += railLength;
  }

  let decodedText = '';
  railIndex = 0;
  direction = 1;

  while (decodedText.length < encodedText.length) {
    if (rails[railIndex].length > 0) {
      decodedText += rails[railIndex].shift();
    }
    if (railIndex === 0) {
      direction = 1;
    } else if (railIndex === numRails - 1) {
      direction = -1;
    }
    railIndex += direction;
  }
  log(decodedText);
  return decodedText;
};
