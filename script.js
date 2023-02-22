import { DECK, VALUES, SUITS, } from './modules/deck.js';
import { shuffle, dealCards, } from './modules/shuffleDeckDealCars.js';

import { getCardsProp, countSuits, countValues, countIndexV } from './modules/sortSeparateCount.js';

import { defineFlopSB, defineFlopBB} from './modules/defineFlopType.js';

import { findCombination, findFlush, findStraight } from './modules/findCombination.js';

import { findFlushDraw, find_SD, find_BDSD } from './modules/findDraw.js';

import { changeClassName, getMainTable, matrixVS, bodyTable } from './modules/matrix.js';

import { 
  possibleCombsMade, 
  possibleCombsFlashDraw, 
  possibleCombsStraightDraw,
  possibleCombsBDStraightDraw,

  getLivePlayerComb, 
  findAllBoardCombinations, 
  findAllFlashDraw,
  findAllStraightDraw,
  countAllCombination,
  findAll_BDSD,
} from './modules/findAllHandsCombination.js';

import { updateDeckHtml, updateComb, displayPercentage } from './modules/create_board_html.js';

// import {CRD} from './cards.js';

import { strategySBFlopCB, sumActions, getCombinationAction } from './strategy/sbFlopCB.js';

import {testFindCombination,
        testData,
} from './modules/test.js';

//
////////// БОРД и КАРТЫ
//
const BOARD = {
  shuffleDeck: [], // shuffled deck
  flopCards: [],   // 3 flop cards
  turnCard: [],    // turn card
  riverCard: [],   // river card
}

const HAND = {
  playerCards: [],    // player's hand (2 cards)
  playerAndFlop: [],  // player's cards + flop (5 cards)
  playerAndTurn: [],  // player's cards + flop + turn (6 cards)
  playerAndRiver: [], // player's cards + flop + turn + river (7 cards)
}

const REZ = {
  flopTypeSB: [],    // flop type SB
  flopTypeBB: [],    // flop type BB
  combination: [], // combination
  flopFD: [],      // flash draws
  flopSD: [],      // straight draw
  flopBDSD: [],      // BDSD
}

const COMB = {
  livePlayerComb: [],    // all comb without flop
  allBoardCombinations: [],    // all comb Made hands
  allCombFlashDraw: [],    // all comb FD
  allCombStraightDraw: [],    // all comb SD
  allCombBDStraightDraw: [],    // all comb BDSD
}

const ACTN = {
  handStrategy: '',
  strategy: [],    // all comb without flop
}


export {BOARD, HAND, REZ, COMB, ACTN}
//
////////// ВЫПОЛНЕНИЕ РАСЧЕТА
//

let shuffButton = document.getElementsByClassName('button'); // Кнопка
shuffButton[0].addEventListener('click', function() {
  console.clear();

//////// 01) МЕШАЕМ и РАЗДАЕМ КАРТЫ ////////
  BOARD.shuffleDeck = shuffle(DECK);

  HAND.playerCards = dealCards(BOARD.shuffleDeck, 2); // 2 карты
  //HAND.playerCards = ['Jd', 'Ad']
  console.log('playerCards', HAND.playerCards);

  BOARD.flopCards = dealCards(BOARD.shuffleDeck, 3); // 3 карты
  //BOARD.flopCards = ['9d', 'Js', '9c']  

  BOARD.turnCard = dealCards(BOARD.shuffleDeck, 1);
  BOARD.riverCard = dealCards(BOARD.shuffleDeck, 1);
  console.log('flopCards', BOARD.flopCards);
// console.log('turnCard:', BOARD.turnCard)
// console.log('riverCard:', BOARD.riverCard)

// Комбинируем доску и руку игрока

  HAND.playerAndFlop = [...HAND.playerCards, ...BOARD.flopCards];
  // console.log('playerAndFlop: ', HAND.playerAndFlop);
  HAND.playerAndTurn = [...HAND.playerCards, ...BOARD.flopCards, ...BOARD.turnCard];
  // console.log('playerAndTurn: ', HAND.playerAndTurn);
  HAND.playerAndRiver = [...HAND.playerCards, ...BOARD.flopCards, ...BOARD.turnCard, ...BOARD.riverCard];
  // console.log('playerAndRiver: ', HAND.playerAndRiver);




//////// 02) ОПРЕДЕЛЯЕМ ТИП ФЛОПА (HU SB) ////////
  REZ.flopTypeSB = defineFlopSB(BOARD.flopCards);
  // console.log('flopTypeSB: ', REZ.flopTypeSB);

  REZ.flopTypeBB = defineFlopBB(BOARD.flopCards);
  console.log('flopTypeBB: ', REZ.flopTypeBB);




//////// 03) ОПРЕДЕЛЯЕМ КОМБИНАЦИЮ ГОТОВЫЕ РУКИ и ДРО ////////
  REZ.combination = findCombination(HAND.playerCards, BOARD.flopCards).comb.rank;
  // console.log('REZ.combination: ', REZ.combination);
  REZ.flopFD = findCombination(HAND.playerCards, BOARD.flopCards).comb.FD;
  // console.log('flopFD: ', REZ.flopFD);
  REZ.flopSD = findCombination(HAND.playerCards, BOARD.flopCards).comb.SD;
  // console.log('flopSD: ', REZ.flopSD);

  REZ.flopBDSD = findCombination(HAND.playerCards, BOARD.flopCards).comb.BDSD;
  // console.log('flopSD: ', REZ.flopSD);

  //// Комбы живые
    COMB.livePlayerComb = getLivePlayerComb(matrixVS, BOARD.flopCards)
  // console.log('live', COMB.livePlayerComb);
  
  //// Комбы все
    COMB.allBoardCombinations = findAllBoardCombinations(possibleCombsMade, BOARD.flopCards, COMB.livePlayerComb);
    console.log('allBoardCombinations', COMB.allBoardCombinations);

    
    COMB.allCombStraightDraw = findAllStraightDraw(possibleCombsStraightDraw, COMB.allBoardCombinations)
    console.log('allComb_SD: ', COMB.allCombStraightDraw);
    
    COMB.allCombBDStraightDraw = findAll_BDSD(possibleCombsBDStraightDraw, COMB.allBoardCombinations);
    console.log('allComb_BDSD: ', COMB.allCombBDStraightDraw);


    console.log('SD: ', REZ.flopSD);
    console.log('BDSD: ', REZ.flopBDSD);

    //// Комбы заполняем экшен стратегии
    COMB.allBoardCombinations = strategySBFlopCB(REZ.flopTypeSB, COMB.allBoardCombinations);

  
  //// Стратегия
  ACTN.strategy = sumActions(COMB.allBoardCombinations);
  // console.log(`check: ${ACTN.strategy.check.percent}% `+
  //             `(comb:${ACTN.strategy.check.count}); `+
  //             `bet: ${ACTN.strategy.bet.percent}% `+
  //             `(comb:${ACTN.strategy.bet.count})`)



  ACTN.handStrategy = getCombinationAction(COMB.allBoardCombinations, REZ.combination, HAND.playerCards)
  // console.log('handStrategy: ', ACTN.handStrategy);



  //////// 04) HTML ////////
// Заполняем типы флопа и комбинацию
  updateDeckHtml(BOARD.flopCards, HAND.playerCards);
  updateComb(REZ.flopTypeSB, REZ.combination + ': ' + ACTN.handStrategy, REZ.flopFD, REZ.flopSD, REZ.flopBDSD,
    `check: ${ACTN.strategy.check.percent}% / `+`CB: ${ACTN.strategy.bet.percent}% `);

  
// Меняем заливку у руки и флопа
  changeClassName(bodyTable); 



displayPercentage(COMB.allBoardCombinations)



//////// 06) ТЕСТЫ ////////
//testFindCombination(testData) // Тест комбинаций


});