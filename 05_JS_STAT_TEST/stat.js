import { } from '../script.js';

import { 
  VALUES, 
  SUITS, 
  DECK, 
  INDEX_VALUES, 
  VALUES_INDEX, 
  SUIT_COLORS, 
  ALLCOMB,
} from '../03_JS_MODULES/deck.js';

import { 
  getCardsInfo, 
} from '../03_JS_MODULES/getCardsInfo.js';

import { 
  shuffle, 
  dealCards, 
} from '../03_JS_MODULES/shuffleDeckDealCars.js';

import { 
  SBflopType, 
  BBflopType, 
  defineFlopSB, 
  defineFlopBB,
} from '../03_JS_MODULES/defineFlopType.js';


// ПОДСЧЕТ ВЕРОЯТНОСТИ ТИПОВ ФЛОПОВ
// Функция для инициализации объекта статистики
function initializeStats() {
  return {
    total: 0,
    flopTypeSBCount: {},
    flopTypeBBCount: {},
  };
}

// Функция для обновления статистики с новым результатом
function updateStats(stats, flopTypeSB, flopTypeBB) {
  stats.total++;

  if (stats.flopTypeSBCount[flopTypeSB] === undefined) {
    stats.flopTypeSBCount[flopTypeSB] = 1;
  } else {
    stats.flopTypeSBCount[flopTypeSB]++;
  }

  if (stats.flopTypeBBCount[flopTypeBB] === undefined) {
    stats.flopTypeBBCount[flopTypeBB] = 1;
  } else {
    stats.flopTypeBBCount[flopTypeBB]++;
  }
}

// Функция для получения процентов по результатам
function getPercentages(stats) {
  const percentages = {
    SB: {},
    BB: {}
  };

  for (const flopTypeSB in stats.flopTypeSBCount) {
    percentages.SB[flopTypeSB] = ((stats.flopTypeSBCount[flopTypeSB] / stats.total) * 100).toFixed(4) + '%';
  }

  for (const flopTypeBB in stats.flopTypeBBCount) {
    percentages.BB[flopTypeBB] = ((stats.flopTypeBBCount[flopTypeBB] / stats.total) * 100).toFixed(4) + '%';
  }

  return percentages;
}

// Основной код для выполнения итераций
function calculateFlopPercentages(iterations) {
  const stats = initializeStats();

  for (let i = 0; i < iterations; i++) {
    const shuffledDeck = shuffle(DECK);
    const flopCards = dealCards(shuffledDeck, 3);
    const flopInfo = getCardsInfo(flopCards);

    const flopTypeSB = defineFlopSB(flopInfo).type_detail;
    const flopTypeBB = defineFlopBB(flopInfo).type_detail;
    updateStats(stats, flopTypeSB, flopTypeBB);
  }

  const percentages = getPercentages(stats);
  return percentages;
}

// Запуск расчетов
// const iterations = 10000;
// const percentages = calculateFlopPercentages(iterations);
// console.log(percentages);



//////////////////////////////////////////////////////
// ПОДСЧЕТ ПРОЦЕНТА CB
// let betPercentSum = 0;
// let betCount = 0;
// let checkPercentSum = 0;
// let checkCount = 0;

// for (let i = 0; i < 100; i++) {
//   restartApp();
//   let betPercent = parseFloat(ACTN.strategySB.bet.percent);
//   let checkPercent = parseFloat(ACTN.strategySB.check.percent);
  
//   betPercentSum += betPercent;
//   betCount += ACTN.strategySB.bet.count;
//   checkPercentSum += checkPercent;
//   checkCount += ACTN.strategySB.check.count;
// }

// let betAvgPercent = betPercentSum / 100;
// let betAvgCount = betCount / 100;
// let checkAvgPercent = checkPercentSum / 100;
// let checkAvgCount = checkCount / 100;

// console.log(`Average bet percent: ${betAvgPercent}, average bet count: ${betAvgCount}`);
// console.log(`Average check percent: ${checkAvgPercent}, average check count: ${checkAvgCount}`);