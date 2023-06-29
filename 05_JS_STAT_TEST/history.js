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
import {
  groupHands, 
  madeGroupHands, 
  nothingGroupHands, 
  doperPlusHands, 
  pairHands,

  possibleDraw,
  possibleBD,

  findGroupHandsAll,
  findAll_draw_BD,

  possibleCombsMade, 
  possibleCombsFlashDraw,
  possibleCombsBDFlashDraw, 
  possibleCombsStraightDraw,
  possibleCombsBDStraightDraw,

  getfilterCombsArr,
  getFlopDeadCombs,
  getLivePlayerComb, 
  findAllBoardCombinations,
  
  findAllFlopCombDrawBD,

  countAllCombination,

  findAllFlashDraw,
  findAll_BDFD,

  findAllStraightDraw,
  findAll_BDSD,
} from '../03_JS_MODULES/findAllHandsCombination.js';
import { 
  strategyBBvFlopCB, 
  sumActionsBB, 
  possibleTypeHandActionBB, 
  getTypeHandActionBB } from '../04_JS_STRATEGY/02_bbFlopvCB.js';

import { history } from './history_data.js';
// console.log(history);

let errorCounts = {};
let boardCounts = {};
let errorHands = {};
let boardErrors = {};

// Основной код для выполнения итераций
function testCSV(history) {
  history.forEach(hand => {
    const playerCards = hand[0];
    const flopCards = hand[1];

    const playerCardsInfo = getCardsInfo(playerCards);  
    const flopInfo = getCardsInfo(flopCards);

    const playerAndFlop = [...playerCards, ...flopCards];
    const playerAndFlopInfo = getCardsInfo(playerAndFlop);
    
    const flopTypeBB = defineFlopBB(flopInfo).type_detail;


    // не игровые комбы на полученном флопе
    const flopDeadCombs = getFlopDeadCombs(ALLCOMB, flopCards)
    // console.log('flopDeadCombs: ', flopDeadCombs);

    //// Фильтруем все комбы 1326 флопа, получаем массив [['Ah', 'Ad'], ... ]
    const livePlayerComb = getLivePlayerComb(ALLCOMB, flopDeadCombs, []);
    // console.log('livePlayerComb: ', livePlayerComb);

    //// ЗАПУСКАЕМ РАСЧЕТ ДАННЫХ ПО ВСЕМ ВОЗМОЖНЫМ КОМБАМ
    const allFlopHands = findAllFlopCombDrawBD(flopCards, livePlayerComb);
    // console.log('all: ', allFlopHands);

    //// КЛЮЧИ К ОБЪЕКТУ РУКИ ИГРОКА
    const keyHand = [[playerCards[0], playerCards[1]], [playerCards[1], playerCards[0]]];
    // console.log('keyHand: ', keyHand);

    let playerHandInfo = allFlopHands[keyHand[0]];
    if (playerHandInfo === undefined) {
      playerHandInfo = allFlopHands[keyHand[1]];
    }
    // console.log('handInfo: ', playerHandInfo);


    const strategyBB = strategyBBvFlopCB(flopTypeBB, allFlopHands);
    const handStrategyBB = playerHandInfo.actionBB.action;

    console.log(playerCards, flopCards);
    console.log(flopTypeBB, playerHandInfo.actionBB.type);

    if (handStrategyBB === 'fold' && hand[2] === 'XF') {
      console.log('правильно');
      boardCounts[flopTypeBB] = (boardCounts[flopTypeBB] || 0) + 1;
    } else if (handStrategyBB === 'fold' && hand[2] !== 'XF') {
      console.log('ОШИБКА!');
      errorCounts[flopTypeBB] = (errorCounts[flopTypeBB] || 0) + 1;
      boardCounts[flopTypeBB] = (boardCounts[flopTypeBB] || 0) + 1;
      if (!errorHands[flopTypeBB]) {
        errorHands[flopTypeBB] = [];
      }
      errorHands[flopTypeBB].push([flopCards, playerCards, playerHandInfo.actionBB.type, handStrategyBB, hand[2]]);
    } else if (handStrategyBB === 'call' && hand[2] === 'XC') {
      console.log('правильно');
      boardCounts[flopTypeBB] = (boardCounts[flopTypeBB] || 0) + 1;
    } else if (handStrategyBB === 'call' && hand[2] !== 'XC') {
      console.log('ОШИБКА!');
      errorCounts[flopTypeBB] = (errorCounts[flopTypeBB] || 0) + 1;
      boardCounts[flopTypeBB] = (boardCounts[flopTypeBB] || 0) + 1;
      if (!errorHands[flopTypeBB]) {
        errorHands[flopTypeBB] = [];
      }
      errorHands[flopTypeBB].push([flopCards, playerCards, playerHandInfo.actionBB.type, handStrategyBB, hand[2]]);
    } else if (handStrategyBB.includes('xR') && hand[2] === 'XR') {
      console.log('правильно');
      boardCounts[flopTypeBB] = (boardCounts[flopTypeBB] || 0) + 1;
    } else if (handStrategyBB.includes('xR') && hand[2] !== 'XR') {
      console.log('ОШИБКА!');
      errorCounts[flopTypeBB] = (errorCounts[flopTypeBB] || 0) + 1;
      boardCounts[flopTypeBB] = (boardCounts[flopTypeBB] || 0) + 1;
      if (!errorHands[flopTypeBB]) {
        errorHands[flopTypeBB] = [];
      }
      errorHands[flopTypeBB].push([flopCards, playerCards, playerHandInfo.actionBB.type, handStrategyBB, hand[2]]);
    }
    
    console.log('errorCounts:', errorCounts);
    console.log('boardCounts:', boardCounts);
    console.log('errorHands:', errorHands);
    console.log('handStrategyBB: ', handStrategyBB, '/ play:', hand[2]);
    console.log('----------------');
  });
  for (let flopType in boardCounts) {
    let total = boardCounts[flopType] || 0;
    let errors = errorCounts[flopType] || 0;
    let errorPercentage = Math.round((errors / total) * 100);
    boardErrors[flopType] = [`${total}/${errors}/${errorPercentage}%]`, errorHands[flopType]];
  }
}

function generateBoardErrorsHTML(boardErrors) {
  const historZone = document.querySelector(".history-container");

  for (let flopType in boardErrors) {
    const flopTypeData = boardErrors[flopType];
    const totalErrors = flopTypeData[0];
    const errorHands = flopTypeData[1];

    // Создаем элемент div для вывода информации о типе флопа
    const flopTypeElement = document.createElement('div');
    flopTypeElement.classList.add('flop-type');
    flopTypeElement.textContent = `${flopType}:`;
    historZone.appendChild(flopTypeElement);

    // Создаем элемент div для вывода информации о количестве ошибок
    const errorCountElement = document.createElement('div');
    errorCountElement.classList.add('error-count');
    errorCountElement.textContent = `Errors: ${totalErrors}`;
    historZone.appendChild(errorCountElement);

    // Проверяем, есть ли ошибочные руки для данного типа флопа
    if (errorHands) {
      // Создаем элемент div для вывода списка ошибочных рук
      const errorHandsElement = document.createElement('div');
      errorHandsElement.classList.add('error-hands');
      errorHands.forEach(hand => {
        const handElement = document.createElement('div');
        handElement.classList.add('hand');

        // Создаем элементы для карт из hand[0]
        const flopElement = document.createElement('div');
        flopElement.classList.add('flopZone');
        hand[0].forEach(card => {
          const cardElement = document.createElement('div');
          cardElement.classList.add('card', `card_${card[1]}`);
          cardElement.textContent = card[0];
          flopElement.appendChild(cardElement);
        });
        handElement.appendChild(flopElement);

        // Создаем элементы для карт из hand[1]
        const playerElement = document.createElement('div');
        playerElement.classList.add('playerZone');
        hand[1].forEach(card => {
          const cardElement = document.createElement('div');
          cardElement.classList.add('card', `card_${card[1]}`);
          cardElement.textContent = card[0];
          playerElement.appendChild(cardElement);
        });

        handElement.appendChild(playerElement);

        // Добавляем созданные элементы рук в блок с ошибочными руками
        errorHandsElement.appendChild(handElement);

        const errorType = document.createElement('div');
        errorType.classList.add('error-type');
        errorType.textContent = `${hand[2]} => ${hand[3]} | ошибка: ${hand[4]}`;
        handElement.appendChild(errorType);
      });
      historZone.appendChild(errorHandsElement);
    }
  }
}

// testCSV(history)
// generateBoardErrorsHTML(boardErrors);