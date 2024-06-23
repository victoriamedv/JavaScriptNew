// This is only a SKELETON file for the 'Robot Simulator' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class InvalidInputError extends Error {
  constructor(message) {
    super();
    this.message = message || 'Invalid Input';
  }
}

export class Robot {
  #x = 0;

  #y = 0;

  #direction = 'north';

  #defaultDirections = ['north', 'east', 'south', 'west'];

  get bearing() {
    return this.#direction;
  }

  get coordinates() {
    return [this.#x, this.#y];
  }

  place(obj) {
    const isFound = this.#defaultDirections.includes(obj.direction);
    if (!isFound) {
      throw new InvalidInputError();
    }

    this.#x = obj.x;
    this.#y = obj.y;
    this.#direction = obj.direction;
  }

  evaluate(instructions) {
    for (let i = 0; i < instructions.length; i += 1) {
      const isFindMyIndex = (element) => element === this.#direction;
      let indexDirection = this.#defaultDirections.findIndex(isFindMyIndex);

      const char = instructions[i];
      switch (char) {
        case 'R':
          indexDirection = indexDirection + 1 === 4 ? 0 : indexDirection + 1;
          break;
        case 'L':
          indexDirection = indexDirection - 1 === -1 ? 3 : indexDirection - 1;
          break;
        case 'A':
          switch (this.#direction) {
            case 'north':
              this.#y += 1;
              break;
            case 'east':
              this.#x += 1;
              break;
            case 'south':
              this.#y -= 1;
              break;
            case 'west':
              this.#x -= 1;
              break;
            default:
              throw new InvalidInputError();
          }
          break;
        default:
          throw new InvalidInputError();
      }

      this.#direction = this.#defaultDirections[indexDirection];
    }
  }
}
