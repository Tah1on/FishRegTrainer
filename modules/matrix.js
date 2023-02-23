import { BOARD, HAND, REZ, ACTN } from '../script.js';
import { DECK, VALUES, SUITS } from './deck.js';

//// Создаем общую матрицы. На выходе два массива 13*13:
// 1) Только комбинации AA, AKs... 169 комбинаций
// Индекс "s" - одномастные руки (78комб). Правая верхняя  часть.
// Индекс "o" - разномастные руки (78комб). Левая нижняя часть.
// Без индекса - карманные пары (13комб). Диагональ
// 2) C отображением комбинаций с мастями. Из функции makeValueMatrix
// @param v -> ['A', 'K', 'Q'...] - value
// @param s -> ['h', 'd', 's', 'c'] - suit
// @returns -> mtrxV ['AA', 'AKs', 'AQs', ...] 
//                   ['AKo', 'KK', 'KQs', ...]
//                   ...
//                   ...
// @returns -> mtrxS [['----', 'AhAd', 'AhAs', 'AhAc'], ['AhKh', '----', '----', '----'], ...]
//                   ...
//                   ...
export function makeValueMatrix(v, s) {
  let mtrxV = [];
  let mtrxVS = []; 
  for (let i = 0; i < v.length; i++) {
    mtrxV[i] = [];
    mtrxVS[i] = [];
    for (let j = 0; j < v.length; j++) {
      // Пары
      if ( v.indexOf(v[i]) === v.indexOf(v[j]) ) {    
        mtrxV[i][j] = v[i]+v[j];
        mtrxVS[i][j] = makeSuitMatrix(s, mtrxV[i][j]);
      }
      // Мастевые
      else if ( v.indexOf(v[i]) < v.indexOf(v[j]) ) {
        mtrxV[i][j] = v[i]+v[j]+'s';
        mtrxVS[i][j] = makeSuitMatrix(s, mtrxV[i][j]);
      }
      // Разномастные
      else if ( v.indexOf(v[i]) > v.indexOf(v[j]) ) {
        mtrxV[i][j] = v[j]+v[i]+'o';
        mtrxVS[i][j] = makeSuitMatrix(s, mtrxV[i][j]);
      }
      else {
        mtrxV[i][j] = '----'; //    
      }
    }
  }
  return [mtrxV, mtrxVS];
}

//// МАТРИЦЫ с отображением мастей. В кажой ячейки 13*13 содержится подмассив 4*4.
// Каждая ячейка заполняется в зависимости от того какая комбинация
// Одномастные - 4шт, разномастные - 12шт, пары- 6шт. Всего (4+12)*78+6*13 = 1326 комбинаций
// Заполняем их так чтобы не было повторов и первая карта была выше второй.
// Разделяем по наличию или отсутсвию индкса 's', 'o' 

// @param s -> ['h', 'd', 's', 'c'] - suit
// @param comb -> 'AA' или AKs или AKo ...
// @returns ->  ['----', 'AhAd', 'AhAs', 'AhAc']
//              ['----', '----', 'AdAs', 'AdAc']
//              ['----', '----', '----', 'AsAc']
//              ['----', '----', '----', '----']
export function makeSuitMatrix(s, comb) {
  let smallMtrxS = [];            
  for (let i = 0; i < s.length; i++) {
    smallMtrxS[i] = [];
    for (let j = 0; j < s.length; j++) {
      // Пары
      if ( (comb[0] === comb[1]) && 
      (SUITS.indexOf(s[i]) < SUITS.indexOf(s[j])) ){
        smallMtrxS[i][j] = comb[0]+s[i]+comb[1]+s[j];
      }
      // Мастевые
      else if ( (comb.includes('s')) && 
      (SUITS.indexOf(s[i]) === SUITS.indexOf(s[j])) ){    
        smallMtrxS[i][j] = comb[0]+s[i]+comb[1]+s[j];
      }
      // Разномастные
      else if ( (comb.includes('o')) && 
      (SUITS.indexOf(s[i]) != SUITS.indexOf(s[j])) ){    
        smallMtrxS[i][j] = comb[0]+s[i]+comb[1]+s[j];
      }
      else {
        smallMtrxS[i][j] = '----'; //    
      }
    }
  }
  return smallMtrxS;
}

///// Матрицы matrixV AA,AK / matrixVS AhAd, AhAs, ...
let [matrixV, matrixVS] = makeValueMatrix(VALUES, SUITS);

export {matrixV, matrixVS};
//console.log('matrixV:', matrixV)
//console.log('matriVS:', matrixVS)


//// Создание внутренней матрицы 4*4
export function getInnerTable(smallTableArr) {
  let innerTable = document.createElement('div')
  innerTable.classList.add("innerTable");
  for (let i = 0; i < smallTableArr.length; i++) {
    let row = document.createElement('div');
    row.classList.add("innerTable-row");
    for (let j = 0; j < smallTableArr[i].length; j++) {
      let el = document.createElement('div');
      el.innerHTML = smallTableArr[i][j];
      el.classList.add("innerTable-row-el");
      row.appendChild(el);
    }
    innerTable.appendChild(row);
  }
  return innerTable;
}

//// Создание основной матрицы 13*13 с вложенными 4*4
export function getMainTable(mainTableArr){
  let mainTable = document.createElement('div')
  mainTable.classList.add("mainTable");
  for (let i = 0; i < mainTableArr.length; i++) {
    let row = document.createElement('div');
    row.classList.add("mainTable-row");
    for (let j = 0; j < mainTableArr[i].length; j++) {
      row.appendChild(getInnerTable(mainTableArr[i][j]));
    }
    mainTable.appendChild(row);   
  }
  return mainTable;
}

//// Меняем стили ячеик руки игрока и флопа в матрице
export function changeClassName(btb){
  const divs = btb.querySelectorAll('.innerTable-row-el');
  divs.forEach(el => {
    el.className = 'innerTable-row-el';
    
    for (const [key, value] of Object.entries(ACTN.strategy.bet.size)) {
      if (el.innerHTML === (HAND.playerCards[0]+HAND.playerCards[1]) || 
          el.innerHTML === (HAND.playerCards[1]+HAND.playerCards[0])) {
        el.classList.add("innerTable-row-el2");
        // Skip this iteration if the element's innerHTML matches one of the player's cards
        continue;
      }
      if (value.cards.includes(el.innerHTML)) {
        el.classList.add(`innerTable-row-e${key.replace('%', '')}`);
      }
    }

    if (  el.innerHTML === `----`) {
      el.classList.add("innerTable-row-el4");

    } else if ( el.innerHTML.includes(BOARD.flopCards[0]) ){
      el.classList.add("innerTable-row-el3");
    } else if ( el.innerHTML.includes(BOARD.flopCards[1]) ){
      el.classList.add("innerTable-row-el3");
    } else if ( el.innerHTML.includes(BOARD.flopCards[2]) ){
      el.classList.add("innerTable-row-el3");

    } else if ( el.innerHTML === (HAND.playerCards[0]+HAND.playerCards[1]) ||
                el.innerHTML === (HAND.playerCards[1]+HAND.playerCards[0]) ){
      el.classList.add("innerTable-row-el2");
      
    } else if ( ACTN.strategy.check.cards.includes(el.innerHTML) ){
      el.classList.add("innerTable-row-el5");      
    }    
  });
}

export function clearClassName(btb){
  const divs = btb.querySelectorAll('.innerTable-row-el');
  divs.forEach(el => {
    el.className = 'innerTable-row-el';
  });
}

//el.innerHTML= changeSuit(hand, suit2)//el.innerHTML = 'ST<span style="color: red">A</span>CK OVERFLOW'




////
// добавление таблицы на страницу
let bodyTable = document.querySelector ('#table');
export { bodyTable, };
bodyTable.appendChild(getMainTable(matrixVS));
//bodyTable.appendChild(getMainTableSimple(matrixV))



// //// Функция для создания основной матрицы без внутренних
// let containerV = document.createElement('div');
//   containerV.className = 'matrixV';
// for (let i = 0; i < matrixV.length; i++) {
//   let rowV = document.createElement('div');
//   rowV.className = 'matrixV-row';
//   for (let j = 0; j < matrixV[i].length; j++) {
//     let cellV = document.createElement('div');
//     cellV.className = 'matrixV-cell';
//     cellV.textContent = matrixV[i][j];
//     rowV.appendChild(cellV);
//   }
//   containerV.appendChild(rowV);
// }
// document.body.appendChild(containerV);

