// This is only a SKELETON file for the 'Robot Name' exercise. It's been
// provided as a convenience to get your started writing code faster.
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// получение рандомного числа в диапозоне включительно
function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function getRandomRobotName() {
  let newName = '';
  for (let i = 0; i < 2; i += 1) { // получение рандомного числа и поиск буквы по рандомном индексу
    const letterNumberAlphabet = getRandomIntInclusive(0, 25);
    const letterAlphabet = alphabet[letterNumberAlphabet];
    newName += letterAlphabet;
  }

  for (let i = 0; i < 3; i += 1) {
    const numberRandom = getRandomIntInclusive(0, 9);
    newName += numberRandom;
  }
  return newName;
}

export class Robot {
  static robotNamesArray = [];

  robotName = '';

  constructor() {
    this.reset();
  }

  static releaseNames() {
    this.robotNamesArray = [];
  }

  get name() {
    return this.robotName;
  }

  reset() {
    let notEqualName = false;

    while (notEqualName === false) {
      const nameRobot = getRandomRobotName();
      if (Robot.robotNamesArray.includes(nameRobot) === false) {
        Robot.robotNamesArray.push(nameRobot);
        this.robotName = nameRobot;
        notEqualName = true;
      }
    }
  }
}
Robot.releaseNames = () => { };
