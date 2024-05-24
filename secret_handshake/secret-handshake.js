// This is only a SKELETON file for the 'Secret Handshake' exercise. It's been provided as a
// convenience to get you started writing code faster.
// 00001 = wink
// 00010 = double blink
// 00100 = close your eyes
// 01000 = jump
// 10000 = Reverse the order of the operations in the secret handshake.

export const commands = (num) => {
  const arrayStr = [];
  let binaryStr = num.toString(2);

  if (binaryStr.length < 5) {
    binaryStr = binaryStr.padStart(5, '0');
  }

  if (binaryStr[4] === '1') {
    arrayStr.push('wink');
  }

  if (binaryStr[3] === '1') {
    arrayStr.push('double blink');
  }

  if (binaryStr[2] === '1') {
    arrayStr.push('close your eyes');
  }

  if (binaryStr[1] === '1') {
    arrayStr.push('jump');
  }

  if (binaryStr[0] === '1') {
    arrayStr.reverse();
  }

  return arrayStr;
};
