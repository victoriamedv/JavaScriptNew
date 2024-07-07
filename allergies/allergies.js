// This is only a SKELETON file for the 'Allergies' exercise. It's been provided as a
// convenience to get you started writing code faster.
//
export class Allergies {
  constructor(points) {
    this.points = points;
    this.allergens = {
      eggs: 1,
      peanuts: 2,
      shellfish: 4,
      strawberries: 8,
      tomatoes: 16,
      chocolate: 32,
      pollen: 64,
      cats: 128,
    };
  }

  list() {
    // result массив строк аллергенов
    const allergicList = [];
    const arrayStrAllergens = Object.keys(this.allergens);
    for (let i = 0; i < arrayStrAllergens.length; i += 1) {
      const element = arrayStrAllergens[i];
      if (this.allergicTo(element)) {
        allergicList.push(element);
      }
    }
    return allergicList;
  }

  allergicTo(allergenStr) {
    const pointsBinary = this.points.toString(2).split('').reverse();
    const allergenBinary = this.allergens[allergenStr].toString(2).split('').reverse();

    for (let i = 0; i < allergenBinary.length; i += 1) {
      if (allergenBinary[i] === '1' && pointsBinary[i] !== '1') {
        return false;
      }
    }
    return true;
  }
}
