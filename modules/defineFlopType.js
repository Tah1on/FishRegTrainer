import {
  getCardsProp,
  countSuits
} from './sortSeparateCount.js';

//
////////// ОПРЕДЕЛЯЕМ ТИП ФЛОПА HU SB
//
// @param flop -> ['Ad', '3c', '9h']
// @returns -> строка 'ВЫСОКИЙ СТРИТОВЫЙ'
export function defineFlopSB(flop) {
  let s = getCardsProp(flop, 'suit');
  let v = getCardsProp(flop, 'value');
  let i = getCardsProp(flop, 'indexV');
  let isort = i.sort((a, b) => b - a);

  if ( s[0] === s[1] && s[1] === s[2] ){
    return 'МОНОТОННЫЙ'
  } else if ( isort[0] === isort[1] && isort[1] === isort[2] ){
    return 'ТРИ ОДИНАКОВЫЕ'
  } else if ( 
      (isort[0] === isort[1] && isort[2] >= 9) || 
      (isort[1] === isort[2] && isort[0] >= 9) ||
      (isort[0] === 11 && isort[1] === 11 && isort[2] === 8) ||
      (isort[0] === 10 && isort[1] === 10 && isort[2] === 8) ||
      (isort[0] === 9 && isort[1] === 9 && isort[2] === 8)
      ){
    return 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара'
  } else if ( 
      isort[0] >= 9 &&
      (isort[0] === isort[1] && isort[2] <= 8)
      ){
    return 'СПАРЕННЫЙ ВЫСОКИЙ НИЗ. Пара'
  } else if (
      isort[0] === 14 &&
      (isort[0] - isort[2] <= 4) ||
      (isort[0] === 14 && isort[1] <= 5 && isort[2] <= 5)
      ){
    return 'ТУЗОВЫЙ СТРИТОВЫЙ'
  } else if (
      isort[0] >= 9 &&
      (isort[0] - isort[2] <= 4) ||
      (isort[0] === 14 && isort[1] <= 5 && isort[2] <= 5)
      ){
    return 'ВЫСОКИЙ СТРИТОВЫЙ'
  } else if ( 
      isort[0] === 14 &&
      (isort[0] - isort[1] <= 4) && 
      (isort[1] - isort[2] <= 4) 
      ){
    return 'ТУЗОВЫЙ СВЯЗАННЫЙ'
  } else if ( 
      isort[0] >= 9 &&
      (isort[0] - isort[1] <= 4) && 
      (isort[1] - isort[2] <= 4) 
      ){
    return 'ВЫСОКИЙ СВЯЗАННЫЙ'
  } else if ( 
      isort[0] === 14 &&
      (isort[1] >= 9 && isort[2] <= 8)
      ){
    return 'ТУЗОВЫЙ СУХОЙ'
  } else if ( 
      isort[0] >= 9 &&
      (isort[1] >= 9 && isort[2] <= 8)
      ){
    return 'СУХОЙ, 2 ВЫСОКИЕ'
  } else if ( 
      isort[0] === 14 &&
      (isort[1] <= 8 && isort[2] <= 8)
      ){
    return 'ТУЗОВЫЙ СУХОЙ'
  } else if ( 
      isort[0] >= 9 &&
      (isort[1] <= 8 && isort[2] <= 8)
      ){
    return 'СУХОЙ, 1 ВЫСОКАЯ'
  } else if ( 
      isort[0] <= 8 &&
      (isort[0] === isort[1] || isort[1] === isort[2])
      ){
    return 'НИЗКИЙ, СПАРЕННЫЙ'
  } else if ( 
      isort[0] <= 8 &&
      (isort[0] - isort[2] <= 4)
      ){
    return 'НИЗКИЙ, СТРИТОВЫЙ'
  } else if ( isort[0] <= 8 ){
    return 'НИЗКИЙ'
  } else {
    return 'error flop type'
  }
}




//
////////// ОПРЕДЕЛЯЕМ ТИП ФЛОПА HU BB
//
// @param flop -> ['Ad', '3c', '9h']
// @returns -> строка 'ВЫСОКИЙ СТРИТОВЫЙ'
export function defineFlopBB(flop) {
  let s = getCardsProp(flop, 'suit');
  let v = getCardsProp(flop, 'value');
  let i = getCardsProp(flop, 'indexV');
  let isort = i.sort((a, b) => b - a);

  let boardSCount = countSuits(flop);

  if ( (s[0] === s[1]) &&
       (s[1] === s[2]) ){
    return 'МОНОТОННЫЙ'
  } else if ( (isort[0] === isort[1]) &&
              (isort[1] === isort[2]) ){
    return 'ТРИ ОДИНАКОВЫЕ'

  } else if ( 
      (Object.keys(boardSCount).length === 2) &&
      ((isort[0] === isort[1] && isort[2] >= 9) || 
       (isort[1] === isort[2] && isort[0] >= 9))
      ){
    return 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара ФД'
  } else if ( 
      (Object.keys(boardSCount).length === 3) &&
      ((isort[0] === isort[1] && isort[2] >= 9) || 
       (isort[1] === isort[2] && isort[0] >= 9))
      ){
    return 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара РАД'

  } else if (
      (Object.keys(boardSCount).length === 2) && 
      (isort[0] >= 9 &&
      (isort[0] === isort[1] && isort[2] <= 8))
      ){
    return 'СПАРЕННЫЙ ВЫСОКИЙ НИЗ. Пара ФД'
  } else if (
      (Object.keys(boardSCount).length === 3) && 
      (isort[0] >= 9 &&
      (isort[0] === isort[1] && isort[2] <= 8))
      ){
    return 'СПАРЕННЫЙ ВЫСОКИЙ НИЗ. Пара РАД'

  } else if (
      (Object.keys(boardSCount).length === 2) && 
      (isort[0] >= 9 &&
      (isort[0] - isort[2] <= 4) ||
      (isort[0] === 14 && isort[1] <= 5 && isort[2] <= 5))
      ){
    return 'ВЫСОКИЙ СТРИТОВЫЙ ФД'
  } else if (
      (Object.keys(boardSCount).length === 3) && 
      (isort[0] >= 9 &&
      (isort[0] - isort[2] <= 4) ||
      (isort[0] === 14 && isort[1] <= 5 && isort[2] <= 5))
      ){
    return 'ВЫСОКИЙ СТРИТОВЫЙ РАД'

  } else if (
      (Object.keys(boardSCount).length === 2) &&  
      (isort[0] >= 9 &&
      (isort[0] - isort[1] <= 4) && 
      (isort[1] - isort[2] <= 4)) 
      ){
    return 'ВЫСОКИЙ СВЯЗАННЫЙ ФД'
  } else if (
      (Object.keys(boardSCount).length === 3) &&  
      (isort[0] >= 9 &&
      (isort[0] - isort[1] <= 4) && 
      (isort[1] - isort[2] <= 4)) 
      ){
    return 'ВЫСОКИЙ СВЯЗАННЫЙ РАД'

  } else if ( 
      (Object.keys(boardSCount).length === 2) &&
      (isort[0] >= 9 && isort[1] >= 9 && isort[2] <= 8)
      ){
    return 'СУХОЙ, 2 ВЫСОКИЕ ФД'
  } else if ( 
      (Object.keys(boardSCount).length === 3) &&
      (isort[0] >= 9 && isort[1] >= 9 && isort[2] <= 8)
      ){
    return 'СУХОЙ, 2 ВЫСОКИЕ РАД'

  } else if ( 
      (Object.keys(boardSCount).length === 2) &&
      (isort[0] >= 9 && isort[1] <= 8 && isort[2] <= 8) 
      ){
    return 'СУХОЙ, 1 ВЫСОКАЯ ФД'
  } else if ( 
      (Object.keys(boardSCount).length === 3) &&
      (isort[0] >= 9 && isort[1] <= 8 && isort[2] <= 8) 
      ){
    return 'СУХОЙ, 1 ВЫСОКАЯ РАД'

  } else if (
      (Object.keys(boardSCount).length === 2) &&
      ((isort[0] <= 8) &&
       (isort[0] === isort[1] || isort[1] === isort[2]))
      ){
    return 'НИЗКИЙ, СПАРЕННЫЙ ФД'
  } else if (
      (Object.keys(boardSCount).length === 3) &&
      ((isort[0] <= 8) &&
       (isort[0] === isort[1] || isort[1] === isort[2]))
      ){
    return 'НИЗКИЙ, СПАРЕННЫЙ РАД'

  } else if (
      (Object.keys(boardSCount).length === 2) &&
      (isort[0] <= 8) &&
      (isort[0] - isort[2] <= 4) 
      ){
    return 'НИЗКИЙ, СТРИТОВЫЙ ФД'
  } else if (
      (Object.keys(boardSCount).length === 3) &&
      (isort[0] <= 8) &&
      (isort[0] - isort[2] <= 4) 
      ){
    return 'НИЗКИЙ, СТРИТОВЫЙ РАД'

  } else if ( 
      (Object.keys(boardSCount).length === 2) &&
      (isort[0] <= 8)
      ){
    return 'НИЗКИЙ ФД'
  } else if ( 
      (Object.keys(boardSCount).length === 3) &&
      (isort[0] <= 8)
      ){
    return 'НИЗКИЙ РАД'
  } else {
    return 'error flop type'
  }
}
