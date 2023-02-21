import { getCardsProp, countSuits, countValues, countIndexV } from './sortSeparateCount.js';
import { findFlushDraw, find_SD, find_BDSD } from './findDraw.js';
//
////////// ОПРЕДЕЛЯЕМ КОМБИНАЦИИ
//

//// Ищем готовые ROYAL FLASH
// @param player -> [Ad, 6c] - рука игрока
// @param board -> [9c, 2s, Js...] - доска
// @returns -> если 5 карт в масть ['Flush', 14] 14 - индекс флеша
function findRoyalStraightFlush(player, board) {
  let flush = findFlush(player, board);
  let straight = find_SD(player, board);
    if (flush && straight.rank === 14 ){
      return {
        comb: {
          rank: 'Royal Flush',
          comb: 'StraightFlush',
          type: 'made',
          strength: 'nuts',         
          FD: null,
          SD: null,
          BDSD: null,
          },
        holeCards: {
          cards: player.join(''),
          cardsArr: player,
          ocket: player[0][0] === player[1][0],
          },
        rank: {
          rank: null,
          kicker: null,
          },
      };
    } else if (flush && straight) {
      return {
        comb: {
          rank: 'Straight Flush',
          comb: 'Straight Flush',
          type: 'made',
          strength: 'nuts',
          FD: null,
          SD: null,
          BDSD: null,
          },
        holeCards: {
          cards: player.join(''),
          cardsArr: player,
          pocket: player[0][0] === player[1][0],
          },
        rank: {
          rank: null,
          kicker: null,
          },
      };
    } else {
      return false;
  }
}


//// Ищем готовые ФЛЕШЫ
// @param player -> [Ad, 6c] - рука игрока
// @param board -> [9c, 2s, Js...] - доска
// @returns -> если 5 карт в масть ['Flush', 14] 14 - индекс флеша
export function findFlush(player, board) {
  let playerIndexValue = getCardsProp(player, 'indexV');  
  let boardIndexValue = getCardsProp(board, 'indexV');
  let combinedIndexValueSort = playerIndexValue.concat(boardIndexValue).sort((a, b) => b - a);

  let suitCount = countSuits(player.concat(board));
  let flashSuit = Object.keys(suitCount).find(key => suitCount[key] === 5);
  flashSuit = flashSuit ? flashSuit : null;

  let sd = find_SD(player, board)
  let bdsd = find_BDSD(player, board)

  if (flashSuit !== null) {
    return {
      comb: {
        rank: 'Flush',
        comb: 'Flush',
        type: 'made',
        strength: 'nuts',
        FD: null,
        SD: sd,
        BDSD: bdsd,
        },  
      holeCards: {
        cards: player.join(''),
        cardsArr: player,
        pocket: player[0][0] === player[1][0],
        },
      rank: {
        rank: combinedIndexValueSort[0],
        kicker: null,
        },
    };
  } else {
    return false;
  } 

// Для терна добавить сколько карт игрока?????
// Category 5: Flash through two cards
// } else if (threeFlashBoard && handSCount[threeFlashBoard] === 2) {
// return 'Flash through two cards';
}


//// Ищем. Quads
// @param player -> [Ad, 6c] - рука игрока
// @param board -> [9c, 2s, Js...] - доска
// @returns -> Quads ['Quads', 14] 14 - индекс карэ
function findQuads(player, board) {
  let indexCount = countIndexV(player.concat(board));
  let quadsIndexValue = Object.keys(indexCount).find(key => indexCount[key] === 4);
  quadsIndexValue = quadsIndexValue ? parseInt(quadsIndexValue) : null;
  if (quadsIndexValue !== null) {
    return {
      comb: {
        rank: 'Quads',
        comb: 'Quads',
        type: 'made',
        strength: 'nuts',
        FD: null,
        SD: null,
        BDSD: null,
        },  
      holeCards: {
        cards: player.join(''),
        cardsArr: player,
        pocket: player[0][0] === player[1][0],
        },
      rank: {
        rank: quadsIndexValue[0],
        kicker: null,
        },
    };
  } else {
    return false;
  } 
}

//// Ищем готовые СТРИТЫ
// @param player -> [Ad, 6c] - рука игрока
// @param board -> [9c, 2s, Js...] - доска
// @returns -> если 5 карт в ряд то стрит. ['Straight'] 14 - индекс стрита
export function findStraight(player, board) {
  let playerIndexValue = getCardsProp(player, 'indexV');
  let uniqPlayerIvSort = Array.from(new Set(playerIndexValue)).sort((a, b) => b - a);
  
  let boardIndexValue = getCardsProp(board, 'indexV');
  let uniqBoardIvSort = Array.from(new Set(boardIndexValue)).sort((a, b) => b - a);
  let combinedIndexValueSort = uniqPlayerIvSort.concat(uniqBoardIvSort).sort((a, b) => b - a);

  let fd = findFlushDraw(player, board)


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
    [5, 4, 3, 2, 14],
  ];
  // Проверяем, совпадение CombinedIndexValueSort с allStraights
  let isStraight = allStraights.find(straight => straight.every(val => combinedIndexValueSort.includes(val)));
  if (isStraight) {
    return {
      comb: {
        rank: 'Straight',
        comb: 'Straight',
        type: 'made',
        strength: 'nuts',
        FD: fd,
        SD: null,
        BDSD: null,
        },  
      holeCards: {
        cards: player.join(''),
        cardsArr: player,
        pocket: player[0][0] === player[1][0],
        },
      rank: {
        rank: isStraight[0],
        kicker: null,
        },
    };
  } 
  return false;
}

//// Ищем. Full House
// @param player -> [Ad, 6c] - рука игрока
// @param board -> [9c, 2s, Js...] - доска
// @returns -> Full House ['Full House', 14, 13] 14 - индекс 3-ки, 13 - индекс пары
function findFull(player, board) { 
  let indexCount = countIndexV(player.concat(board));

  let tripleIndexValue = Object.keys(indexCount).find(key => indexCount[key] === 3);
  tripleIndexValue = tripleIndexValue ? parseInt(tripleIndexValue) : null;

  let pairIndexValue = Object.keys(indexCount).find(key => indexCount[key] === 2);
  pairIndexValue = pairIndexValue ? parseInt(pairIndexValue) : null;

  let fd = findFlushDraw(player, board)
  let sd = find_SD(player, board)

  if ( tripleIndexValue !== null &&
       pairIndexValue !== null ){
    return {
      comb: {
        rank: 'Full House',
        comb: 'Full House',
        type: 'made',
        strength: 'nuts',
        FD: fd,
        SD: sd,
        BDSD: null,
        },  
      holeCards: {
        cards: player.join(''),
        cardsArr: player,
        pocket: player[0][0] === player[1][0],
        },
      rank: {
        rank: tripleIndexValue,
        kicker: null,
        },
    };
  } else {
    return false;
  }
}
//// Ищем. ТРИПСЫ / СЕТЫ
// @param player -> [Ad, 6c] - рука игрока
// @param board -> [9c, 2s, Js...] - доска
// @returns -> ['Set', 9, null] / ['Trips', 5, 9] 5 - индекс трипса; 9 - киккер
function findTripsSet(player, board) { 
  let playerIndexValue = getCardsProp(player, 'indexV');

  let indexCount = countIndexV(player.concat(board));

  let boardIndexValue = getCardsProp(board, 'indexV');
  let uniqBoardIvSort = Array.from(new Set(boardIndexValue)).sort((a, b) => b - a);

  let tripleIndexValue = Object.keys(indexCount).find(key => indexCount[key] === 3);
  tripleIndexValue = tripleIndexValue ? parseInt(tripleIndexValue) : null;

  let tripsKicker = playerIndexValue.filter(index => index !== tripleIndexValue)[0];

  let fd = findFlushDraw(player, board)
  let sd = find_SD(player, board)
  let bdsd = find_BDSD(player, board)

  if ( tripleIndexValue !== null && playerIndexValue[0] === playerIndexValue[1] ){
    return {
      comb: {
        rank: 'Set',
        comb: 'Set',
        type: 'made',
        strength: 'nuts',
        FD: fd,
        SD: null,
        BDSD: null,
        },  
      holeCards: {
        cards: player.join(''),
        cardsArr: player,
        pocket: player[0][0] === player[1][0],
        },
      rank: {
        rank: tripleIndexValue,
        kicker: null,
        },
    };

  } else if ( tripleIndexValue !== null && uniqBoardIvSort.length !== 1 ){
    return {
      comb: {
        rank: 'Trips',
        comb: 'Trips',
        type: 'made',
        strength: 'nuts',
        FD: fd,
        SD: sd,
        BDSD: bdsd,
        },  
      holeCards: {
        cards: player.join(''),
        cardsArr: player,
        pocket: player[0][0] === player[1][0],
        },
      rank: {
        rank: tripleIndexValue,
        kicker: tripsKicker,
        },
    };
  } else {
    return false;
  }
}

//// Ищем готовые ДОПЕРА
// @param player -> [Ad, 6c] - рука игрока
// @param board -> [9c, 2s, Js...] - доска
// @returns -> Doper
function findDoper(player, board) { 
  let combinedCount = countValues(player.concat(board));
  let boardCount = countValues(board);
  let fd = findFlushDraw(player, board)

  if ( (Object.keys(combinedCount).filter( (key) => combinedCount[key] === 2 ).length === 2) && 
      (Object.keys(boardCount).filter( (key) => boardCount[key] === 2 ).length != 1) ){
    return {
      comb: {
        rank: 'Doper',
        comb: 'Doper',
        type: 'made',
        strength: 'nuts',
        FD: fd,
        SD: null,
        BDSD: null,
        },  
      holeCards: {
        cards: player.join(''),
        cardsArr: player,
        pocket: player[0][0] === player[1][0],
        },
      rank: {
        rank: null,
        kicker: null,
        },
    };
  } else {
    return false;
  }
}

//// Ищем ПАРЫ
// @param player -> [Ad, 6c] - рука игрока
// @param board -> [9c, 2s, Js...] - доска
// @returns -> Тип пары. Для карманок ['Overpair', null]; для остальных пар ['Top Pair', 14]; 14 - киккер
function findPairs(player, board) {
  let indx = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  
  let playerIndexValue = getCardsProp(player, 'indexV');
  let uniqPlayerIvSort = Array.from(new Set(playerIndexValue)).sort((a, b) => b - a);
  
  let boardIndexValue = getCardsProp(board, 'indexV');
  let uniqBoardIvSort = Array.from(new Set(boardIndexValue)).sort((a, b) => b - a);
  
  
  let indexBoardCount = countIndexV(board);
  let pairIndexValue = Object.keys(indexBoardCount).find(key => indexBoardCount[key] === 2);
  pairIndexValue = pairIndexValue ? parseInt(pairIndexValue) : null;

  let pairedFlopIndexTP = uniqBoardIvSort.filter(index => index !== pairIndexValue);

  let indxFiltered = indx.filter(x => !uniqBoardIvSort.includes(x));  

  let fd = findFlushDraw(player, board)
  let sd = find_SD(player, board)
  let bdsd = find_BDSD(player, board)

  // Борд без спарки
  if (pairIndexValue === null) {
    if (playerIndexValue[0] === playerIndexValue[1] && playerIndexValue[0] > uniqBoardIvSort[0] ){
      return {
        comb: {
          rank: 'Overpair',   // ранк комбинации
          comb: 'Pair',       // общая комбинация
          type: 'made',       // тип комбинации
          strength: 'top',
          FD: fd,             // Флеш дро
          SD: sd,             // Стрит дро
          BDSD: bdsd,
          },  
        holeCards: {
          cards: player.join(''),   // ['QcJh']
          cardsArr: player,         // ['Qc', 'Jh']
          pocket: player[0][0] === player[1][0],  // true (pocket)
          },
        rank: {
          rank: playerIndexValue[0],
          kicker: null,
          rankTP: pairedFlopIndexTP[0],
          },
      };

    } else if (playerIndexValue[0] === playerIndexValue[1] &&
               playerIndexValue[0] < uniqBoardIvSort[0] &&
               playerIndexValue[0] > uniqBoardIvSort[1] ){
      return {
        comb: {
          rank: 'Under Pair',
          comb: 'Pair',
          type: 'made',
          strength: 'top',
          FD: fd,
          SD: sd,
          BDSD: bdsd,
          },  
        holeCards: {
          cards: player.join(''),
          cardsArr: player,
          pocket: player[0][0] === player[1][0],  // true (pocket)
          },
        rank: {
          rank: playerIndexValue[0],
          kicker: null,
          rankTP: pairedFlopIndexTP[0],
          underTPIndex: indxFiltered.filter(num => num <= uniqBoardIvSort[0]).indexOf(uniqPlayerIvSort[0]) + 1,
          },
      };

    } else if (playerIndexValue[0] === playerIndexValue[1] &&
               playerIndexValue[0] < uniqBoardIvSort[1] &&
               playerIndexValue[0] > uniqBoardIvSort[2] ){
      return {
        comb: {
          rank: '3-rd Pair',
          comb: 'Pair',
          type: 'made',
          strength: 'low',
          FD: fd,
          SD: sd,
          BDSD: bdsd,
          },  
        holeCards: {
          cards: player.join(''),
          cardsArr: player,
          pocket: player[0][0] === player[1][0],  // true (pocket)
          },
        rank: {
          rank: playerIndexValue[0],
          kicker: null,
          rankTP: pairedFlopIndexTP[0],
          underTPIndex: indxFiltered.filter(num => num <= uniqBoardIvSort[0]).indexOf(uniqPlayerIvSort[0]) + 1,
          },
      };

    } else if (playerIndexValue[0] === playerIndexValue[1] &&
               playerIndexValue[0] < uniqBoardIvSort[2] ){
      return {
        comb: {
          rank: 'Weak Pair',
          comb: 'Pair',
          type: 'made',
          strength: 'low',
          FD: fd,
          SD: sd,
          BDSD: bdsd,
          },  
        holeCards: {
          cards: player.join(''),
          cardsArr: player,
          pocket: player[0][0] === player[1][0],  // true (pocket)
          },
        rank: {
          rank: playerIndexValue[0],
          kicker: null,
          rankTP: pairedFlopIndexTP[0],
          underTPIndex: indxFiltered.filter(num => num <= uniqBoardIvSort[0]).indexOf(uniqPlayerIvSort[0]) + 1,
          },
      };

    } else if (uniqPlayerIvSort[0] === uniqBoardIvSort[0] ){
      return {
        comb: {
          rank: 'Top Pair',
          comb: 'Pair',
          type: 'made',
          strength: 'top',
          FD: fd,
          SD: sd,
          BDSD: bdsd,
          },  
        holeCards: {
          cards: player.join(''),
          cardsArr: player,
          pocket: player[0][0] === player[1][0],  // false
          },
        rank: {
          rank: uniqPlayerIvSort[0],
          kicker: uniqPlayerIvSort[1],
          topIndex: indxFiltered.indexOf(uniqPlayerIvSort[1]) + 1,
          lowIndex: indxFiltered.reverse().indexOf(uniqPlayerIvSort[1]) + 1,
          },
      };

    } else if (uniqPlayerIvSort[1] === uniqBoardIvSort[0] ){
      return { 
        comb: {
          rank: 'Top Pair',
          comb: 'Pair',
          type: 'made',
          strength: 'top',
          FD: fd,
          SD: sd,
          BDSD: bdsd,
          },  
        holeCards: {
          cards: player.join(''),
          cardsArr: player,
          pocket: player[0][0] === player[1][0],  // false
          },
        rank: {
          rank: uniqPlayerIvSort[1],
          kicker: uniqPlayerIvSort[0],
          topIndex: indxFiltered.indexOf(uniqPlayerIvSort[0]) + 1,
          lowIndex: indxFiltered.reverse().indexOf(uniqPlayerIvSort[0]) + 1,
          },
      };

    } else if (uniqPlayerIvSort[0] === uniqBoardIvSort[1] ){
      return {
        comb: {
          rank: '2-nd Pair',
          comb: 'Pair',
          type: 'made',
          strength: 'middle',
          FD: fd,
          SD: sd,
          BDSD: bdsd,
          },  
        holeCards: {
          cards: player.join(''),
          cardsArr: player,
          pocket: player[0][0] === player[1][0],  // false
          },
        rank: {
          rank: uniqPlayerIvSort[0],
          kicker: uniqPlayerIvSort[1],
          topIndex: indxFiltered.indexOf(uniqPlayerIvSort[1]) + 1,
          lowIndex: indxFiltered.reverse().indexOf(uniqPlayerIvSort[1]) + 1,
          },
      };

    } else if (uniqPlayerIvSort[1] === uniqBoardIvSort[1] ){
      return {
        comb: {
          rank: '2-nd Pair',
          comb: 'Pair',
          type: 'made',
          strength: 'middle',
          FD: fd,
          SD: sd,
          BDSD: bdsd,
          },  
        holeCards: {
          cards: player.join(''),
          cardsArr: player,
          pocket: player[0][0] === player[1][0],  // false
          },
        rank: {
          rank: uniqPlayerIvSort[1],
          kicker: uniqPlayerIvSort[0],
          topIndex: indxFiltered.indexOf(uniqPlayerIvSort[0]) + 1,
          lowIndex: indxFiltered.reverse().indexOf(uniqPlayerIvSort[0]) + 1,
          },
      };

    } else if (uniqPlayerIvSort[0] === uniqBoardIvSort[2] ){
      return {
        comb: {
          rank: '3-rd Pair',
          comb: 'Pair',
          type: 'made',
          strength: 'low',
          FD: fd,
          SD: sd,
          BDSD: bdsd,
          },  
        holeCards: {
          cards: player.join(''),
          cardsArr: player,
          pocket: player[0][0] === player[1][0],  // false
          },
        rank: {
          rank: uniqPlayerIvSort[0],
          kicker: uniqPlayerIvSort[1],
          topIndex: indxFiltered.indexOf(uniqPlayerIvSort[1]) + 1,
          lowIndex: indxFiltered.reverse().indexOf(uniqPlayerIvSort[1]) + 1,
          },
      };

    } else if (uniqPlayerIvSort[1] === uniqBoardIvSort[2] ){
      return {
        comb: {
          rank: '3-rd Pair',
          comb: 'Pair',
          type: 'made',
          strength: 'low',
          FD: fd,
          SD: sd,
          BDSD: bdsd,
          },  
        holeCards: {
          cards: player.join(''),
          cardsArr: player,
          pocket: player[0][0] === player[1][0],  // false
          },
        rank: {
          rank: uniqPlayerIvSort[1],
          kicker: uniqPlayerIvSort[0],
          topIndex: indxFiltered.indexOf(uniqPlayerIvSort[0]) + 1,
          lowIndex: indxFiltered.reverse().indexOf(uniqPlayerIvSort[0]) + 1,
          },
      };

    } else {
      return false;
    }
  // Спарка
  } else if (pairIndexValue !== null){
    if (playerIndexValue[0] === playerIndexValue[1] && playerIndexValue[0] > pairedFlopIndexTP[0] ){
      return { 
        comb: {
          rank: 'Overpair',
          comb: 'Pair',
          type: 'made',
          strength: 'top',
          FD: fd,
          SD: sd,
          BDSD: bdsd,
          },  
        holeCards: {
          cards: player.join(''),
          cardsArr: player,
          pocket: player[0][0] === player[1][0],  // true (pocket)
          },
        rank: {
          rank: playerIndexValue[0],
          kicker: null,
          rankTP: pairedFlopIndexTP[0],
          underTPIndex: indxFiltered.filter(num => num <= pairedFlopIndexTP[0]).indexOf(uniqPlayerIvSort[0]) + 1,
          },
      };

    } else if (playerIndexValue[0] === playerIndexValue[1] &&
      playerIndexValue[0] < pairedFlopIndexTP[0] ){
      return {
        comb: {
          rank: 'Under Pair',
          comb: 'Pair',
          type: 'made',
          strength: 'top',
          FD: fd,
          SD: sd,
          BDSD: bdsd,
          },  
        holeCards: {
          cards: player.join(''),
          cardsArr: player,
          pocket: player[0][0] === player[1][0],  // true (pocket)
          },
        rank: {
          rank: playerIndexValue[0],
          kicker: null,
          rankTP: pairedFlopIndexTP[0],
          underTPIndex: indxFiltered.filter(num => num <= pairedFlopIndexTP[0]).indexOf(uniqPlayerIvSort[0]) + 1,
          },
      };

    } else if (playerIndexValue[0] === pairedFlopIndexTP[0] ){
      return {
        comb: {
          rank: 'Top Pair',
          comb: 'Pair',
          type: 'made',
          strength: 'top',
          FD: fd,
          SD: sd,
          BDSD: bdsd,
          },  
        holeCards: {
          cards: player.join(''),
          cardsArr: player,
          pocket: player[0][0] === player[1][0],  // false
          },
        rank: {
          rank: uniqPlayerIvSort[0],
          kicker: uniqPlayerIvSort[1],
          topIndex: indxFiltered.indexOf(uniqPlayerIvSort[1]) + 1,
          lowIndex: indxFiltered.reverse().indexOf(uniqPlayerIvSort[1]) + 1,
          },
      };

    } else if (playerIndexValue[1] === pairedFlopIndexTP[0] ){
      return {
        comb: {
          rank: 'Top Pair',
          comb: 'Pair',
          type: 'made',
          strength: 'top',
          FD: fd,
          SD: sd,
          BDSD: bdsd,
          },  
        holeCards: {
          cards: player.join(''),
          cardsArr: player,
          pocket: player[0][0] === player[1][0],  // false
          },
        rank: {
          rank: uniqPlayerIvSort[1],
          kicker: uniqPlayerIvSort[0],
          topIndex: indxFiltered.indexOf(uniqPlayerIvSort[0]) + 1,
          lowIndex: indxFiltered.reverse().indexOf(uniqPlayerIvSort[0]) + 1,
          },
      };

    } else {
      return false;
    }
  }
}

//// Ищем 1-2ТХ и остальной мусор
// @param player -> [Ad, 6c] - рука игрока
// @param board -> [9c, 2s, Js...] - доска
// @returns -> ['1TH', 6] 6 - киккер / Nothing
function findTHnothing(player, board) {
  let v = [14, 13, 12, 11, 10, 9, 8];

  let playerIndexValue = getCardsProp(player, 'indexV');
  let uniqPlayerIvSort = Array.from(new Set(playerIndexValue)).sort((a, b) => b - a);
  
  let boardIndexValue = getCardsProp(board, 'indexV');
  let uniqBoardIvSort = Array.from(new Set(boardIndexValue)).sort((a, b) => b - a);

  v = v.filter(index => !~uniqBoardIvSort.indexOf(index));

  let fd = findFlushDraw(player, board)
  let sd = find_SD(player, board)
  let bdsd = find_BDSD(player, board)

  if (v.indexOf(uniqPlayerIvSort[0]) === 0) {
    return {
      comb: {
        rank: '1TH',
        comb: 'TH',
        type: 'made',
        strength: 'air',
        FD: fd,
        SD: sd,
        BDSD: bdsd,
        },  
      holeCards: {
        cards: player.join(''),
        cardsArr: player,
        pocket: player[0][0] === player[1][0],
        },
      rank: {
        rank: uniqPlayerIvSort[0],
        kicker: uniqPlayerIvSort[1],
        },
    };
      
  } else if (v.indexOf(uniqPlayerIvSort[0]) === 1) {
    return {
      comb: {
        rank: '2TH',
        comb: 'TH',
        type: 'made',
        strength: 'air',
        FD: fd,
        SD: sd,
        BDSD: bdsd,
        },  
      holeCards: {
        cards: player.join(''),
        cardsArr: player,
        pocket: player[0][0] === player[1][0],
        },
      rank: {
        rank: uniqPlayerIvSort[0],
        kicker: uniqPlayerIvSort[1],
        },
    };

  } else {
    return { 
      comb: {
        rank: 'Nothing',
        comb: 'Nothing',
        type: 'Nothing',
        strength: 'air',
        FD: fd,
        SD: sd,
        BDSD: bdsd,
        },  
      holeCards: {
        cards: player.join(''),
        cardsArr: player,
        pocket: player[0][0] === player[1][0],
        },
      rank: {
        rank: uniqPlayerIvSort[0],
        kicker: uniqPlayerIvSort[1],
        },
    };
  }
}

//Функция. ОПРЕДЕЛЯЕМ КОМБИНАЦИЮ НА ФЛОПЕ
// @param flop -> [Ad, 6c, 9c]
// @param hand -> [Ad, 6c, 9c, 2s, Js...]
// @param player -> [2s, Js]
// @returns -> если 5 карт в масть то флеш
export function findCombination(player, board) {
  if (findRoyalStraightFlush(player, board) ){
    return findRoyalStraightFlush(player, board)
  } else if (findQuads(player, board) ){
    return findQuads(player, board)
  } else if (findFull(player, board) ){
    return findFull(player, board)
  } else if (findFlush(player, board) ){ 
    return findFlush(player, board)
  } else if (findStraight(player, board) ){
    return findStraight(player, board)
  } else if (findTripsSet(player, board)){
    return findTripsSet(player, board)
  } else if (findDoper(player, board) ){
    return findDoper(player, board)
  } else if (findPairs(player, board) ){
    return findPairs(player, board)
  } else {
    return findTHnothing(player, board)
  }
}

//// Готовые руки

// 'Royal Flush'
// 'Straight Flush'
// 'Quads' 'Four of a kind'
// 'Full House'
// 'Flush'
// 'Straight'
// 'Three Of a Kind'  'Trips' 'Set'
// 'Two Pair'
// 'Overpair'
// 'Top Pair'
// 'Under Pair'
// '2-nd Pair'
// '3-nd Pair'  '+ pp >3p <2p'
// 'Weak Pair'  '+ pp <3p'
// '1TX'
// '2TX'
// 'Nothing'