import { DECK } from './deck.js';

//// Получаем массив по параметру
// @param hand -> [{Ad},{Ah}...]
// @param prop ->  suit, value, index ....
// @returns -> [d, c, s....]
export function getCardsProp(hand, prop) {
  let values = [];
  hand.forEach(card => {
    values.push(DECK[card][prop]);
  });
  return values;
}

//// Считаем кол-во мастей
// @param hand -> [Ad, 6c, 9c, 2s, Js...]
// @returns -> {s: 1, d: 3, h: 1} объект
export function countSuits(hand) {
  let s = getCardsProp(hand, 'suit');
  let sCount = {};
  s.forEach(function(x) { sCount[x] = (sCount[x] || 0)+1; });
    return sCount;
}

//// Считаем кол-во карт одного ранга
// @param hand -> [Ad, 6c, 9c, 2s, Js...]
// @returns -> {2: 2, 3: 1, 5: 1, A: 1} объект
export function countValues(hand) {
  let v = getCardsProp(hand, 'value');
  let vCount = {};
  v.forEach(function(x) {
    vCount[x] = (vCount[x] || 0)+1; });
    return vCount;    
}

export function countIndexV(hand) {
  let v = getCardsProp(hand, 'indexV');
  let vCount = {};
  v.forEach(function(x) {
    vCount[x] = (vCount[x] || 0)+1; });
    return vCount;    
}