import { findCombination, } from './findCombination.js';
import { findFlushDraw, } from './findDraw.js';
import { matrixVS, getMainTable, } from './matrix.js';
import { BOARD, COMB, } from '../script.js';

let possibleCombsMade = [
  'Royal Flush',
  'Straight Flush',
  'Quads',
  'Full House',
  'Flush',
  'Straight',
  'Set',
  'Trips',
  'Doper',
  'Overpair',
  'Top Pair',
  'Under Pair',
  '2-nd Pair',
  '3-rd Pair',
  'Weak Pair',
  '1TH',
  '2TH',
  'Nothing',
];


let possibleCombsFlashDraw = [
  'BDFD (2 card)',
  'BDFD (1 card)',
  'Flash Draw (2 card)',
  'Flash Draw (1 card)',
  'NO BDFD',
];

let possibleCombsStraightDraw = [
  'OESD (2 card)', // Open Ended Straight Draw
  'OESD (1 card)',
  'DBB (2 card)', // Double Gutshot (Double-Belly Buster)
  'Gutshot (2 card)',
  'Gutshot (1 card)',
  'NO Straight Draw',
  'OESD ???',
];

let possibleCombsBDStraightDraw = [
  'BDOESD (2 card)',
  'BDOESD (1 card)',
  'BDDBB (2 card)',
  'BDDBB (1 card)',
  'BDGutshot (2 card)',
  'BDGutshot (1 card)',
  'BDNO BD Straight Draw',
  'BDOESD ???',
];

export {possibleCombsMade, possibleCombsFlashDraw, possibleCombsStraightDraw, possibleCombsBDStraightDraw }

//// Фильтруем живые комбы из массива без комб флопа
// @param mtx -> все комбинации, включая заполения '----'
// @param flop -> [Ad, 6c, 9c]
// @returns -> массив из 1176 рук [['Ah', 'Ad'], ['Ah', 'As']...]
export function getLivePlayerComb(mtx, flop) {
  let rez = [];
  let a1 = [];
  let a2 = [];
  a1 = mtx.flat(Infinity).filter(function(fltr1) { // arr.flat(Infinity) -раскрываем массив до его самой нижней вложенности
    return fltr1 != '----';
  });
  a2 = a1.filter(function(fltr2) {
    if ( fltr2.includes(flop[0]) || fltr2.includes(flop[1]) || fltr2.includes(flop[2]) ){
      return false;
    } else {
      return true;
    }
  });
  rez = a2.map(hand => [hand.slice(0,2), hand.slice(2)])
  return rez;
}

//// Ищем для живых рук комбинации готовые руки
// @param findTarget -> массив комбинаций
// @param flop -> [Ad, 6c, 9c]
// @param livePlayerComb -> массив рук без карт флопа
// @returns -> массив из объектов {type: 'Set', percent: '0.77%', count: 9, combs: Array(9)}
export function findAllBoardCombinations(combsToFind, board, livePlayerComb) {
  const result = {};
  for (let i = 0; i < livePlayerComb.length; i++) {
    const combinations = findCombination(livePlayerComb[i], board);
    if (combsToFind.includes(combinations.comb.rank)) {
      if (!result[combinations.comb.rank]) {
        result[combinations.comb.rank] = [];
      }
      result[combinations.comb.rank].push(combinations);
    }
  }
  // Формируем вывод в порядке combsToFind
  let finalResult = [];
  combsToFind.forEach(comb => {
    if (result[comb]) {
      let percent = result[comb].length / livePlayerComb.length * 100;
      finalResult.push({
      type: comb,
      percent: percent.toFixed(2) + '%',
      count: result[comb].length,
      combs: result[comb],
    });
    }
  });
  return finalResult;
}



//// Ищем для живых рук комбинации ФД
// @param combsToFind -> массив комбинаций
// @param board -> [Ad, 6c, 9c]
// @param livePlayerComb -> массив рук без карт флопа
// @returns -> объект {Flash draw through Two cards: [['Xh', 'Xh'],...], ....}
export function findAllFlashDraw(combsToFind, board, livePlayerComb) {
  let combinations = {};
  combsToFind.forEach(comb => {
    combinations[comb] = [];
  });
  livePlayerComb.forEach(hand => {
    let combination = findFlushDraw([...hand, ...board], hand);
    combinations[combination].push(hand);
  });
  // Вычисляем процент для каждой комбинации
  let result = [];
  let total = livePlayerComb.length;
    for (let key in combinations) {
    let percent = combinations[key].length / total * 100;
      if (combinations[key].length > 0) {
        result.push({
        type: key,
        count: combinations[key].length,
        percent: percent.toFixed(2) + '%',
        combs: combinations[key],
      });
    }
  }
  return result;
}

//// Ищем комбинации СД
// @param combsToFind -> массив комбинаций
// @param allBoardCombinations -> объект
// @returns -> массив из объектов {type: 'Gutshot (2 card)', percent: '12.24%', count: 144, combs: Array(144)}
export function findAllStraightDraw(combsToFind, allBoardCombinations ) {
  const combinationsBySD = {};
  // итерируемся по всем элементам allBoardCombinations и суммируем по SD
  allBoardCombinations.forEach((combination) => {
    combination.combs.forEach((comb) => {
      if (combsToFind.includes(comb.comb.SD)) {
        if (combinationsBySD[comb.comb.SD]) {
          combinationsBySD[comb.comb.SD].count += 1;
          combinationsBySD[comb.comb.SD].combs.push(comb);
        } else {
          combinationsBySD[comb.comb.SD] = {
            type: comb.comb.SD,
            count: 1,
            combs: [comb],
          };
        }
      }
    });
  });
  // вычисляем общее число комбинаций
  let totalCount = 0;
  Object.values(combinationsBySD).forEach((comb) => {
    totalCount += comb.count;
  });  
  // Формируем вывод в порядке combsToFind
  let finalResult = [];
  combsToFind.forEach((type) => {
    if (combinationsBySD[type]) {
      let percent = ((combinationsBySD[type].count / totalCount) * 100).toFixed(2) + "%";
      finalResult.push({
        type: type,
        percent: percent,
        count: combinationsBySD[type].count,
        combs: combinationsBySD[type].combs,
      });
    }
  });
  return finalResult;
}

//// Ищем комбинации БДСД
// @param combsToFind -> массив комбинаций
// @param allBoardCombinations -> объект
// @returns -> массив из объектов {type: 'Gutshot (2 card)', percent: '12.24%', count: 144, combs: Array(144)}
export function findAll_BDSD(combsToFind, allBoardCombinations ) {
  const combinationsBySD = {};
  // итерируемся по всем элементам allBoardCombinations и суммируем по SD
  allBoardCombinations.forEach((combination) => {
    combination.combs.forEach((comb) => {
      if (combsToFind.includes(comb.comb.BDSD)) {
        if (combinationsBySD[comb.comb.BDSD]) {
          combinationsBySD[comb.comb.BDSD].count += 1;
          combinationsBySD[comb.comb.BDSD].combs.push(comb);
        } else {
          combinationsBySD[comb.comb.BDSD] = {
            type: comb.comb.BDSD,
            count: 1,
            combs: [comb],
          };
        }
      }
    });
  });
  // вычисляем общее число комбинаций
  let totalCount = 0;
  Object.values(combinationsBySD).forEach((comb) => {
    totalCount += comb.count;
  });  
  // Формируем вывод в порядке combsToFind
  let finalResult = [];
  combsToFind.forEach((type) => {
    if (combinationsBySD[type]) {
      let percent = ((combinationsBySD[type].count / totalCount) * 100).toFixed(2) + "%";
      finalResult.push({
        type: type,
        percent: percent,
        count: combinationsBySD[type].count,
        combs: combinationsBySD[type].combs,
      });
    }
  });
  return finalResult;
}

//// Получаем массив всех комбинации
// @param flop -> [Ad, 6c, 9c]
// @param livePlayerComb -> массив рук без карт флопа
// @returns -> массив ['Set: 9', 'Doper: 27', 'Overpair: 18', ...]
export function countAllCombination(allCombinations) {

  let countAllComb = [];
  for (let combination in allCombinations) {
    if (allCombinations[combination].length > 0) {
      countAllComb.push(`${combination}: ${allCombinations[combination].length}`);
    }
  }
  return countAllComb;
}