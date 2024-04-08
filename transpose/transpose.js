// This is only a SKELETON file for the 'Transpose' exercise. It's been provided as a
// convenience to get you started writing code faster.
export const transpose = (array) => {
  const matrix = array;
  const maxLength = Math.max(...matrix.map((row) => row.length));
  for (let i = 0; i < matrix.length; i += 1) {
    matrix[i] = matrix[i].replaceAll(' ', '_');
    matrix[i] = matrix[i].padEnd(maxLength, ' ');
  }
  const newArray = [];
  for (let j = 0; j < matrix.length; j += 1) {
    const elementJ = matrix[j];
    for (let k = 0; k < elementJ.length; k += 1) {
      const currentChar = elementJ[k];
      const previousChar = newArray[k] ? newArray[k] : '';
      newArray[k] = previousChar + currentChar;
    }
  }

  for (let l = 0; l < newArray.length; l += 1) {
    newArray[l] = newArray[l].trimRight();
    newArray[l] = newArray[l].replaceAll('_', ' ');
  }
  return newArray;
};
