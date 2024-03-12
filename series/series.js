//
// This is only a SKELETON file for the 'Series' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Series {
  constructor(series) {
    this.series = series;
  }

  slices(sliceLength) {
    if (this.series.length === 0) {
      throw new Error('series cannot be empty');
    }

    if (this.series.length < sliceLength) {
      throw new Error('slice length cannot be greater than series length');
    }

    if (sliceLength === 0) {
      throw new Error('slice length cannot be zero');
    }

    if (sliceLength < 0) {
      throw new Error('slice length cannot be negative');
    }

    const array = [];
    for (let i = 0; i < this.series.length && (i + sliceLength <= this.series.length); i += 1) {
      const partString = this.series.slice(i, i + sliceLength);
      const arrayRow = partString.split('').map((x) => Number(x));
      array.push(arrayRow);
    }
    return array;
  }
}
