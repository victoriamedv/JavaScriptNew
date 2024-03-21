// This is only a SKELETON file for the 'Space Age' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

function planetAge(seconds, yearToSec = 1) {
  const earthSec = 31557600;
  return Number.parseFloat((seconds / (earthSec * yearToSec)).toFixed(2));
}

export const age = (planet, seconds) => {
  switch (planet) {
    case 'earth':
      return planetAge(seconds);
    case 'mercury':
      return planetAge(seconds, 0.2408467);
    case 'venus':
      return planetAge(seconds, 0.61519726);
    case 'mars':
      return planetAge(seconds, 1.8808158);
    case 'jupiter':
      return planetAge(seconds, 11.862615);
    case 'saturn':
      return planetAge(seconds, 29.447498);
    case 'uranus':
      return planetAge(seconds, 84.016846);
    case 'neptune':
      return planetAge(seconds, 164.79132);
    default:
      return 0;
  }
};
