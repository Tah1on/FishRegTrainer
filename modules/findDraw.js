import { getCardsProp, countSuits, countValues, countIndexV } from './sortSeparateCount.js';
import { 
  possibleCombsMade, 
  possibleCombsFlashDraw, 
  possibleCombsStraightDraw,

  getLivePlayerComb, 
  findAllBoardCombinations, 
  findAllFlashDraw,
  findAllStraightDraw,
  countAllCombination,
} from './findAllHandsCombination.js';
//
////////// ОПРЕДЕЛЯЕМ ДРО ФД / СД
//

//// Ищем ФЛЕШ ДРО
// @param board -> [Ad, 6c, 9c...]
// @param hand -> [Ad, 6c]
// @returns -> ФД / БДФД
export function findFlushDraw(hand, board) {
  let boardSuit = getCardsProp(board, 'suit');
  let boardSCount = countSuits(board);
  let handSCount = countSuits(hand);

  let threeFlashBoard = Object.keys(boardSCount).find(key => boardSCount[key] === 3);

  let twoFlashBoard = Object.keys(boardSCount).find(key => boardSCount[key] === 2);
  let twoFlashHand = Object.keys(handSCount).find(key => handSCount[key] === 2);

  // Category 1: Backdoor Flash draw through Two cards
  if ( twoFlashBoard === undefined &&
       threeFlashBoard === undefined && 
       Object.keys(handSCount).find(key => handSCount[key] === 2) &&
       boardSuit.includes(twoFlashHand) ){
    return 'BDFD (2 card)';
  // Category 2: Backdoor Flash draw through one card
  } else if ( (twoFlashBoard && handSCount[twoFlashBoard] === 1) ){
    return 'BDFD (1 card)';
  // Category 3: Flash draw through two cards
  } else if (twoFlashBoard && handSCount[twoFlashBoard] === 2) {
    return 'Flash Draw (2 card)';
  // Category 4: Flash draw through one card
  } else if (threeFlashBoard && handSCount[threeFlashBoard] === 1) {
    return 'Flash Draw (1 card)';
  // Category 5: No Backdoor Flash draw
  } else {
    return 'NO BDFD';
  }
}



//// Ищем СТРИТ ДРО / OESD / DBB / Gutshot
// @param board -> [Ad, 6c, 9c...]
// @param hand -> [Ad, 6c]
// @returns -> 'Gutshot (1 card)'
export function find_SD(hand, board) {
  let boardIndexValue = getCardsProp(board, 'indexV'); // индексы борда 
  let uniqBoardIvSort = Array.from(new Set(boardIndexValue)).sort((a, b) => b - a); // убрали повторы и сорт
  
  let playerIndexValue = getCardsProp(hand, 'indexV'); // индексы руки 
  let uniqPlayerIvSort = Array.from(new Set(playerIndexValue)).sort((a, b) => b - a); // убрали повторы и сорт

  // убрали из руки повторы с бордом, т.к. он не учавствует в сборе стрита
  let uniqPlrIvMinusBrd = Array.from(new Set(uniqPlayerIvSort)).filter(indx => !uniqBoardIvSort.includes(indx));
  // общий массив руки и борда, сорт
  let combUnqPlrBrdIvSort = Array.from(new Set([...uniqBoardIvSort, ...uniqPlayerIvSort])).sort((a, b) => b - a);

  // Массив всех возможных стритов
  let allStraights = [
    [14, 13, 12, 11, 10],
    [13, 12, 11, 10, 9],
    [12, 11, 10, 9, 8],
    [11, 10, 9, 8, 7],
    [10, 9, 8, 7, 6],
    [9, 8, 7, 6, 5],
    [8, 7, 6, 5, 4],
    [7, 6, 5, 4, 3],
    [6, 5, 4, 3, 2],
    [14, 5, 4, 3, 2]
  ];
  let matchCountAll = []; // массив для хранения всех matchCount [2, 3, 3, 3, 3, 2, 1, 2, 1, 1]
  let straightMatchesFive = []; // возможные стриты
  let straightMatchesFour = []; // возможные стрит дро
  
  // Проверяем, существует ли стриты или дро. Считаем повторы в руке+борд и всех стритах

  allStraights.forEach(straight => {
    let matchCount = 0;
    straight.forEach(value => {
      if (combUnqPlrBrdIvSort.includes(value)) {
        matchCount++;
      }
    });
    
    matchCountAll.push(matchCount); // добавляем текущий matchCount в общий массив
    if (matchCount === 5) {
      straightMatchesFive.push(straight);
    } else if (matchCount === 4) {
      straightMatchesFour.push(straight);
    }
  });
  // проверяем, содержит ли matchCountAll 5, 4 или 3
  let pocketCardsMatch = 0;
  if (matchCountAll.includes(5)) {
    return 'Straight already';
    // проверяем, стрит дро
  } else if (matchCountAll.includes(4)) {
    ////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////

    // ищем кол-во последовательных карт в руке + борд maxProgressionCount  
    let progressionCount = 1;
    let maxProgressionCount = 1;    
    combUnqPlrBrdIvSort.forEach((card, index) => {
      if (card === combUnqPlrBrdIvSort[index + 1] + 1) {
        progressionCount++;
        if (progressionCount > maxProgressionCount) {
          maxProgressionCount = progressionCount;
        }
      } else {
        progressionCount = 1;
      }
    });

    let outs = [];
    let cardsMatchs = [];
    straightMatchesFour.forEach(straight => {        
      let out = straight.filter(value => !combUnqPlrBrdIvSort.includes(value)).join(', ');
      pocketCardsMatch = uniqPlrIvMinusBrd.filter(card => straight.includes(card)).length;
      cardsMatchs.push(pocketCardsMatch);
      // console.log(`s[${straight}];b[${combUnqPlrBrdIvSort}]${out};h[${uniqPlrIvMinusBrd}: ${pocketCardsMatch}](${uniqPlrIvMinusBrd.filter(card => straight.includes(card))})`);
      if (!outs.includes(out)) {
        outs.push(out);
      }
    });
    // console.log('cardsMatchs: ', cardsMatchs);


    // Gutshot
    if (outs.length === 1) {
        if (straightMatchesFour.length === 1) {
          return `Gutshot (${pocketCardsMatch} card)`  // => ${outs}`;
        } else {
          return `Gutshot (${cardsMatchs[0]} card)`  // => ${outs}`;
        }
    // OESD
    } else if (outs.length === 2) {
        // OESD
        if (maxProgressionCount === 4) {
            if (straightMatchesFour.length === 2 &&
                cardsMatchs[0] === cardsMatchs[1]) {
              return `OESD (${cardsMatchs[0]} card)`  // => ${outs}`;
            } else if (straightMatchesFour.length === 3 &&
                       cardsMatchs[0] === 2 &&
                       cardsMatchs[1] === 2 &&
                       cardsMatchs[2] === 2) {
              return `OESD (2 card)`  // => ${outs}`;
            } else if (straightMatchesFour.length === 3 &&
                       cardsMatchs[0] === 1 &&
                       cardsMatchs[1] === 2 &&
                       cardsMatchs[2] === 2) {
              return `OESD (2 card)`  // => ${outs}`;
            } else if (straightMatchesFour.length === 3 &&
                       cardsMatchs[0] === 2 &&
                       cardsMatchs[1] === 2 &&
                       cardsMatchs[2] === 1) {
              return `OESD (2 card)`  // => ${outs}`;
            } else if (straightMatchesFour.length === 3 &&
                       cardsMatchs[0] === 2 &&
                       cardsMatchs[1] === 1 &&
                       cardsMatchs[2] === 1) {
              return `OESD (2 card)`  // => ${outs}`;
            } else if (straightMatchesFour.length === 3 &&
                       cardsMatchs[0] === 1 &&
                       cardsMatchs[1] === 1 &&
                       cardsMatchs[2] === 2) {
              return `OESD (1 card)`  // => ${outs}`;
            } else {
              return `OESD ???`;
            }
        // DBB
        } else {
          return `DBB (${Math.max(...cardsMatchs)} card)`  // => ${outs}`;
        }
    }
  } else {
    return 'NO Straight Draw';
  }
}



//// Ищем БД СТРИТ ДРО / BDOESD / BDDBB / BDGutshot
// @param board -> [Ad, 6c, 9c...]
// @param hand -> [Ad, 6c]
// @returns -> 'BDOESD (1 card)'
export function find_BDSD(hand, board) {
  let boardIndexValue = getCardsProp(board, 'indexV');
  let uniqBoardIvSort = Array.from(new Set(boardIndexValue)).sort((a, b) => b - a);  
  let playerIndexValue = getCardsProp(hand, 'indexV');
  let uniqPlayerIvSort = Array.from(new Set(playerIndexValue)).sort((a, b) => b - a);
  let uniqPlrIvMinusBrd = Array.from(new Set(uniqPlayerIvSort)).filter(indx => !uniqBoardIvSort.includes(indx));
  let combUnqPlrBrdIvSort = Array.from(new Set([...uniqBoardIvSort, ...uniqPlayerIvSort])).sort((a, b) => b - a);
  // Массив всех возможных стритов
  let allStraights = [
    [14, 13, 12, 11, 10],
    [13, 12, 11, 10, 9],
    [12, 11, 10, 9, 8],
    [11, 10, 9, 8, 7],
    [10, 9, 8, 7, 6],
    [9, 8, 7, 6, 5],
    [8, 7, 6, 5, 4],
    [7, 6, 5, 4, 3],
    [6, 5, 4, 3, 2],
    [14, 5, 4, 3, 2]
  ];
  let matchCountAll = []; // массив для хранения всех matchCount
  let straightMatchesThree = [];
  // Проверяем, существует ли стриты или дро
  allStraights.forEach(straight => {
    let matchCount = 0;
    straight.forEach(value => {
    if (combUnqPlrBrdIvSort.includes(value)) {
      matchCount++;
    }
    });    
      matchCountAll.push(matchCount); // добавляем текущий matchCount в общий массив
    });
    if (matchCountAll.includes(5)) {
      return ''; // 'Straight already';
    } else if (matchCountAll.includes(4)) { 
      return '';  // 'Straight Draw already'
    } else if (matchCountAll.includes(3)) { 

      let trn = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
      let newBoardIv;
      let turnDraw = {}; // создаем пустой объект для хранения результатов
      trn.forEach(rank => {        
        newBoardIv = [...board, `${rank}d`];
        let result = find_SD(hand, newBoardIv);
        turnDraw[rank] = result; // добавляем результат в объект с ключом, соответствующим текущему рангу
        // console.log('find_SD: ', `${rank}; ${find_SD(hand, newBoardIv)} `);

      });
      //console.log(turnDraw);
      let turnDrawArr = Object.values(turnDraw);
      let turnDrawArrSorted = [];
      possibleCombsStraightDraw.forEach(draw => {
        if (turnDrawArr.includes(draw) && !turnDrawArrSorted.includes(draw)) {
          turnDrawArrSorted.push(draw);
        }
      });
      if (turnDrawArrSorted[0] === 'NO Straight Draw') {
        return 'NO BD Straight Draw';
      } else {
        return `BD${turnDrawArrSorted[0]} => ${Object.keys(turnDraw).filter(key => turnDraw[key] === turnDrawArrSorted[0])}`;
      }
    } else {
      return 'NO BD Straight Draw';
  }     
}











// 'Combo draw'
// 'Flash draw'
// 'OESD'
// 'Gutshot'
// 'BD_FD'
// 'BD_SD'
// 'BD_FD_SD'
// 'No draw'

// RAINBOW

// 'OESD'
// 'Gutshot'
// 'BD_FD'
// 'BD_SD'
// 'BD_FD_SD'
// 'No draw'