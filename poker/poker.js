function onePair(hand, rankObj) {
  // Две карты одного ранга (например, 2H и 2D).
  const numsHand = [];
  for (let i = 0; i < hand.length; i += 1) {
    const element = hand[i];
    const num = getMappedRank(element);
    numsHand.push(num);
  }

  numsHand.sort((a, b) => a - b);

  let hasDuplicate = false;
  let sumDuplicate = 0;
  // создаем новый массив только из цифр в "руки"
  for (let i = 0; i < numsHand.length - 1; i += 1) {
    if (numsHand[i] === numsHand[i + 1]) {
      hasDuplicate = true;
      sumDuplicate = numsHand[i] + numsHand[i + 1];
      break;
    }
  }
  // Создаем копию rankObj и изменяем её свойства
  const newRankObj = { ...rankObj };
  if (hasDuplicate === false) {
    return newRankObj;
  }
  newRankObj.rank = 1;
  newRankObj.rankCombinationCardSum = sumDuplicate;
  return newRankObj;
}

function twoPairs(hand, rankObj) {
  // Две пары карт одного ранга (например, 2H и 2D, 8H и 8D).

  const numsHand = [];
  for (let i = 0; i < hand.length; i += 1) {
    const element = hand[i];
    const num = getMappedRank(element);
    numsHand.push(num);
  }

  numsHand.sort((a, b) => a - b);

  const hasDuplicate = [];
  // создаем новый массив только из цифр "руки"
  for (let i = 0; i < numsHand.length - 1; i += 1) {
    if (numsHand[i] === numsHand[i + 1]) {
      hasDuplicate.push(numsHand[i + 1] + numsHand[i]);
      i += 1;
    }
  }
  // Создаем копию rankObj и изменяем её свойства
  const newRankObj = { ...rankObj };
  if (hasDuplicate.length < 2) {
    return newRankObj;
  }
  newRankObj.rank = 2;
  newRankObj.rankCombinationCardSum = hasDuplicate.reduce((acc, number) => acc + number, 0);
  return newRankObj;
}

function threePairs(hand, rankObj) {
  // Три карты одного ранга (например, 4H, 4D и 4C).
  const numsHand = [];
  for (let i = 0; i < hand.length; i += 1) {
    const element = hand[i];
    const num = getMappedRank(element);
    numsHand.push(num);
  }
  // Создаем копию rankObj и изменяем её свойства
  const newRankObj = { ...rankObj };

  numsHand.sort((a, b) => a - b);
  let numFilterArray = [];
  for (let j = 0; j < numsHand.length; j += 1) {
    const element = numsHand[j];
    numFilterArray = numsHand.filter((el) => el === element);
    if (numFilterArray.length === 3) {
      newRankObj.rank = 3;
      newRankObj.rankCombinationCardSum = numFilterArray.reduce((acc, number) => acc + number, 0);
      break;
    }
  }
  return newRankObj;
}

function street(hand, rankObj) {
  // Пять последовательных карт разной масти (например, 4D, 5H, 6S, 7C, 8H)
  const numsHand = [];
  for (let i = 0; i < hand.length; i += 1) {
    const element = hand[i];
    const num = getMappedRank(element);
    numsHand.push(num);
  }

  numsHand.sort((a, b) => a - b);

  // ТУЗ в стрите
  const FirstFourExist = isSpecificSequential(numsHand, [2, 3, 4, 5, 14]);
  // let LastFourExist  = isSpecificSequential(FirstFourArr, [10,11,12,13]);

  if (FirstFourExist === true) {
    // Туз в начале
    // Удаляем последний элемент
    numsHand.pop();

    // Добавляем новое число в начало массива
    numsHand.unshift(1);
  }

  // Сумма пяти последовательных чисел всегда будет равна:
  // [ \text{Сумма} = n + (n+1) + (n+2) + (n+3) + (n+4) = 5n + 10 ]
  // где ( n ) - первое число в последовательности.
  // Таким образом, если сумма пяти чисел равна ( 5n + 10 ), то эти числа идут последовательно.
  const sum = numsHand.reduce((acc, num) => acc + num, 0);
  const n = numsHand[0];

  // Создаем копию rankObj и изменяем её свойства
  const newRankObj = { ...rankObj };
  if (sum === 5 * n + 10) {
    newRankObj.rank = 4;
    newRankObj.rankCombinationCardSum = sum;
  }

  return newRankObj;
}

function flash(hand, rankObj) {
  // Пять карт одной масти (например, 2S, 4S, 5S, 6S, 7S).
  const lettersArray = extractLetters(hand);
  const element = lettersArray[0];
  const filterlettersArray = lettersArray.filter((el) => el === element);
  // Создаем копию rankObj и изменяем её свойства для Eslint
  const newRankObj = { ...rankObj };
  if (filterlettersArray.length === 5) {
    newRankObj.rank = 5;

    const numsHand = [];
    for (let i = 0; i < hand.length; i += 1) {
      const element2 = hand[i];
      const num = getMappedRank(element2);
      numsHand.push(num);
    }

    numsHand.sort((a, b) => a - b);

    newRankObj.rankCombinationCardSum = numsHand.reduce((acc, number) => acc + number, 0);
  }
  return newRankObj;
}

function fullHouse(hand, rankObj) {
  // Тройка и пара (например, 5H, 5S, 5D и 8S, 8D).

  const numsHand = [];
  for (let i = 0; i < hand.length; i += 1) {
    const element = hand[i];
    const num = getMappedRank(element);
    numsHand.push(num);
  }
  // Создаем копию rankObj и изменяем её свойства для Eslint
  const newRankObj = { ...rankObj };
  numsHand.sort((a, b) => a - b);
  const fullHouseCheck = isFullHouse(numsHand);
  if (fullHouseCheck === true) {
    newRankObj.rank = 6;
    newRankObj.rankCombinationCardSum = numsHand.reduce((acc, number) => acc + number, 0);
  }
  return newRankObj;
}

function kare(hand, rankObj) {
  // Четыре карты одного ранга (например, 3H, 3S, 3D и 3C).

  const numsHand = [];
  for (let i = 0; i < hand.length; i += 1) {
    const element = hand[i];
    const num = getMappedRank(element);
    numsHand.push(num);
  }

  numsHand.sort((a, b) => a - b);
  // Создаем копию rankObj и изменяем её свойства для Eslint
  const newRankObj = { ...rankObj };

  for (let j = 0; j < numsHand.length; j += 1) {
    const curentElement = numsHand[j];
    const filterNumArray = numsHand.filter((el) => el === curentElement);
    if (filterNumArray.length === 4) {
      newRankObj.rank = 7;
      newRankObj.rankCombinationCardSum = filterNumArray.reduce((acc, number) => acc + number, 0);
      break;
    }
  }

  return newRankObj;
}

function streetFlash(hand, rankObj) {
  // Пять последовательных карт одной масти (например, 7S, 8S, 9S, 10S, JS).

  // делаем массив с числами отдельно и сортируем (1,2,3)
  const numsHand = [];
  for (let i = 0; i < hand.length; i += 1) {
    const element = hand[i];
    const num = getMappedRank(element);
    numsHand.push(num);
  }

  numsHand.sort((a, b) => a - b);

  const sum = numsHand.reduce((acc, num) => acc + num, 0);
  const n = numsHand[0];
  let allNumList = false;
  if (sum === 5 * n + 10) {
    allNumList = true;
  }

  // делаем массив букв отдельно и сортируем (A,B,C)
  let allLettersSame = false;
  const lettersArray = extractLetters(hand);
  const element = lettersArray[0];
  const filterlettersArray = lettersArray.filter((el) => el === element);
  if (filterlettersArray.length === 5) {
    allLettersSame = true;
  }
  // Создаем копию rankObj и изменяем её свойства для Eslint
  const newRankObj = { ...rankObj };

  if (allNumList === true && allLettersSame === true) {
    newRankObj.rank = 8;
    newRankObj.rankCombinationCardSum = sum;
  }

  return newRankObj;
}

function isFullHouse(arr) {
  let countThree = 0;
  let countTwo = 0;

  for (let i = 0; i < arr.length; i += 1) {
    let count = 0;
    for (let j = 0; j < arr.length; j += 1) {
      if (arr[i] === arr[j]) {
        count += 1;
      }
    }
    if (count === 3) {
      countThree += 1;
    } else if (count === 2) {
      countTwo += 1;
    }
  }

  return countThree === 3 && countTwo === 2;
}
function convertString(str) {
  // Проверяем, что строка не пуста
  if (str.length === 0) {
    return str; // Возвращаем пустую строку, если входная строка пуста
  }
  // Возвращаем подстроку без последнего символа
  return str.slice(0, -1);
}

function extractLetters(hand) {
  return hand.map((item) => {
    // Проверяем, что строка не пуста
    if (item.length === 0) {
      return ''; // Возвращаем пустую строку, если входная строка пуста
    }
    // Возвращаем последний символ строки
    return item.charAt(item.length - 1);
  });
}

function getMappedRank(handelement) {
  const element = convertString(handelement);
  switch (element) {
    case '1':
      return 1;
    case '2':
      return 2;
    case '3':
      return 3;
    case '4':
      return 4;
    case '5':
      return 5;
    case '6':
      return 6;
    case '7':
      return 7;
    case '8':
      return 8;
    case '9':
      return 9;
    case '10':
      return 10;
    case 'J':
      return 11;
    case 'Q':
      return 12;
    case 'K':
      return 13;
    case 'A':
      return 14;
    default:
      throw new Error(`Invalid hand element: ${handelement}`);
  }
}

function getCardBestRank(hand) {
  const arrayRank = [];
  for (let i = 0; i < hand.length; i += 1) {
    const handelement = hand[i];
    const rank = getMappedRank(handelement);
    arrayRank.push(rank);
  }
  arrayRank.sort((a, b) => b - a);
  const rank = arrayRank[0];
  return rank;
}

function getRank(hand) {
  let rankObj = {
    rank: 0,
    rankCombinationCardSum: 0,
  };
  rankObj = onePair(hand, rankObj); // 1
  rankObj = twoPairs(hand, rankObj); // 2
  rankObj = threePairs(hand, rankObj); // 3
  rankObj = street(hand, rankObj); // 4
  rankObj = flash(hand, rankObj); // 5
  rankObj = fullHouse(hand, rankObj); // 6
  rankObj = kare(hand, rankObj); // 7
  rankObj = streetFlash(hand, rankObj); // 8

  return rankObj;
}

function isSpecificSequential(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((value, index) => value === arr2[index]);
}

export const bestHands = (hands) => {
  let resultArray = [];
  if (hands.length === 1) {
    // Если передана только одна рука, возвращаем её как лучший вариант
    return hands;
  }

  const rankedHands = [];
  for (let i = 0; i < hands.length; i += 1) {
    const hand = hands[i];
    const handArray = hand.split(' ');

    // Получаем ранг руки и суммируем карты ранга
    const rankObj = getRank(handArray);
    const { rank } = rankObj;
    const { rankCombinationCardSum } = rankObj;
    const rankBestCard = getCardBestRank(handArray);

    // Преобразуем карты в числовые значения и суммируем их
    const newHandArray = [];
    for (let j = 0; j < handArray.length; j += 1) {
      const element = handArray[j];
      const num = getMappedRank(element);
      newHandArray.push(num);
    }
    const rankSumCard = newHandArray.reduce((acc, num) => acc + num, 0);

    // Создаем объект для хранения информации о руке
    const rankedHand = {
      hand,
      rank,
      rankBestCard,
      rankCombinationCardSum,
      rankSumCard,
    };
    rankedHands.push(rankedHand);
  }

  // Упорядочиваем руки по рангу
  rankedHands.sort((a, b) => b.rank - a.rank);

  const firstElement = rankedHands[0];

  if (firstElement.rank === 0) {
    // Если ранг равен 0, упорядочиваем по лучшей карте и общей сумме карт
    rankedHands.sort((a, b) => {
      if (b.rankBestCard === a.rankBestCard) {
        return b.rankSumCard - a.rankSumCard;
      }
      return b.rankBestCard - a.rankBestCard;
    });

    const firstElementRank = rankedHands[0].rankBestCard;
    const firstElementSum = rankedHands[0].rankSumCard;
    // Добавляем руки с одинаковыми ранговыми картами и суммами карт в результирующий массив
    for (let k = 0; k < rankedHands.length
      && firstElementRank === rankedHands[k].rankBestCard
      && firstElementSum === rankedHands[k].rankSumCard; k += 1) {
      const element = rankedHands[k].hand;
      resultArray.push(element);
    }
  } else {
    // Упорядочиваем руки по рангу, затем по сумме комбинации карт и общей сумме карт
    rankedHands.sort((a, b) => {
      if (b.rank === a.rank) {
        if (b.rankCombinationCardSum === a.rankCombinationCardSum) {
          return b.rankSumCard - a.rankSumCard;
        }
        return b.rankCombinationCardSum - a.rankCombinationCardSum;
      }
      return b.rank - a.rank;
    });

    const firstElementRank = rankedHands[0].rank;
    const firstElementSum = rankedHands[0].rankCombinationCardSum;
    // Добавляем руки с одинаковым рангом и суммами карт в результирующий массив
    for (let k = 0; k < rankedHands.length
      && firstElementRank === rankedHands[k].rank
      && firstElementSum === rankedHands[k].rankCombinationCardSum; k += 1) {
      const element = rankedHands[k].hand;
      resultArray.push(element);
    }

    // Если у нас есть несколько рук с одинаковыми значениями, возвращаем только первую
    if (resultArray.length > 1) {
      resultArray = [rankedHands[0].hand];
    }
  }

  return resultArray;
};

// const hands = ['2S 3H 2D 4D 5H', '4S 2H 4C 3S 5D']; // одна пара
// const hands = ['2S 8H 2D 8D 3H', '4S 5H 4C 8S 5D']; // две пары
// const hands = ['2S 2H 2D 8D 3H', '4S 4H 4C 8S 5D']; // три карты одного ранга
// const hands = ['2S 2S 2S 2S 3S', '4S 4H 4C 8S 5D']; // 5 карт одной масти
// const hands = ['7S 8S 9S 6S 10S', '7S 8S 9S 10S 2S']; // 5 последовательных карт одной масти

// const hands = ['2S 2H 2C 8D JH', '4S AH AS 8C AD'];

// const hands = ['JD QH JS 8D QC', 'JS QS JC 2D QD'];

// const hands =   ['4S 5H 4C 8D 4H', '4D AH 3S 2D 5C'];

// const hands =   ['2H 3C 4D 5D 6H', '4S AH 3S 2D 5H'];

// const hands =   ['3S 3H 2S 3D 3C', '3S 3H 4S 3D 3C'];
// let resultAr = bestHands(hands);
// console.log(resultAr);
