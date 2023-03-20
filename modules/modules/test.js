import { defineFlopSB, defineFlopBB} from './defineFlopType.js';
import { findCombination, } from './findCombination.js';
import { findFlushDraw, find_SD, find_BDSD, } from './findDraw.js';

/////////////////////////////////////////////////
//////// ТЕСТЫ ////////
/////////////////////////////////////////////////

function testFindFlushDraw() {
  const testCases = [
    {
      hand: ['Ah', 'Kh'],
      board: ['Qd', 'Js', 'Tc'],
      expected: 'NO FD',
    },
    {
      hand: ['Ad', 'Kd'],
      board: ['Qd', 'Js', 'Tc'],
      expected: 'NO FD',
    },
    {
      hand: ['Qh', 'Jh'],
      board: ['Th', '9h', '8d'],
      expected: 'Flash Draw (2 card)',
    },
    {
      hand: ['Qh', 'Jd'],
      board: ['Th', '9h', '8h'],
      expected: 'Flash Draw (1 card)',
    },
    {
      hand: ['Ah', '2h'],
      board: ['3h', '5h', '5s'],
      expected: 'Flash Draw (2 card)',
    },
  ];

  testCases.forEach((test) => {
    const result = findFlushDraw(test.hand, test.board);
    console.assert(result[0] === test.expected, `For hand ${test.hand} and board ${test.board}, expected ${test.expected}, but got ${result[0]}`);
  });
}    

function testFindBDFD() {
  const testCases = [
    {
      hand: ['Ah', 'Kh'],
      board: ['Qd', 'Js', 'Tc'],
      expected: 'NO BDFD',
    },
    {
      hand: ['Ad', 'Kd'],
      board: ['Qd', 'Js', 'Tc'],
      expected: 'BDFD (2 card)',
    },
    {
      hand: ['Qh', 'Jd'],
      board: ['Th', '9h', '8d'],
      expected: 'BDFD (1 card)',
    },
    {
      hand: ['Qd', 'Jd'],
      board: ['Th', '9h', '8d'],
      expected: 'BDFD (2 card)',
    },
    {
      hand: ['Ah', '2d'],
      board: ['3h', '5h', '5s'],
      expected: 'BDFD (1 card)',
    },
    {
      hand: ['As', 'Qs'],
      board: ['3h', '5h', '5s'],
      expected: 'BDFD (2 card)',
    },
  ];

  testCases.forEach((test) => {
    const result = findFlushDraw(test.hand, test.board);
    console.assert(result[1] === test.expected, `For hand ${test.hand} and board ${test.board}, expected ${test.expected}, but got ${result[1]}`);
  });
} 
testFindBDFD();






function testDefineFlopType() {
  const testCases = [
    // 1 //
    {
      board: ['Kd', 'Th', '3c'],
      expected_SB: 'СУХОЙ 2 ВЫСОКИЕ',
      expected_BB: 'СУХОЙ 2 ВЫСОКИЕ РАД',
    },
    {
      board: ['Ad', 'Jh', '6h'],
      expected_SB: 'ТУЗОВЫЙ СУХОЙ',
      expected_BB: 'СУХОЙ 2 ВЫСОКИЕ ФД',
    },
    {
      board: ['Jd', '9h', '2d'],
      expected_SB: 'СУХОЙ 2 ВЫСОКИЕ',
      expected_BB: 'СУХОЙ 2 ВЫСОКИЕ ФД *',
    },
    // 2 //
    {
      board: ['Kd', '4h', '3c'],
      expected_SB: 'СУХОЙ 1 ВЫСОКАЯ',
      expected_BB: 'СУХОЙ 1 ВЫСОКАЯ РАД',
    },
    {
      board: ['Td', '4h', '3d'],
      expected_SB: 'СУХОЙ 1 ВЫСОКАЯ',
      expected_BB: 'СУХОЙ 1 ВЫСОКАЯ ФД *',
    },
    {
      board: ['As', '7h', '2h'],
      expected_SB: 'ТУЗОВЫЙ СУХОЙ',
      expected_BB: 'СУХОЙ 1 ВЫСОКАЯ ФД',
    },
    // 3 //
    {
      board: ['Kd', 'Jh', '8c'],
      expected_SB: 'ВЫСОКИЙ СВЯЗАННЫЙ',
      expected_BB: 'ВЫСОКИЙ СВЯЗАННЫЙ РАД *2★',
    },
    {
      board: ['Kd', '9h', '8c'],
      expected_SB: 'ВЫСОКИЙ СВЯЗАННЫЙ',
      expected_BB: 'ВЫСОКИЙ СВЯЗАННЫЙ РАД',
    },
    {
      board: ['Jd', '8h', '4c'],
      expected_SB: 'ВЫСОКИЙ СВЯЗАННЫЙ',
      expected_BB: 'ВЫСОКИЙ СВЯЗАННЫЙ РАД *',
    },
    {
      board: ['Jd', '9h', '5h'],
      expected_SB: 'ВЫСОКИЙ СВЯЗАННЫЙ',
      expected_BB: 'ВЫСОКИЙ СВЯЗАННЫЙ ФД',
    },
    {
      board: ['Jd', '8h', '5h'],
      expected_SB: 'ВЫСОКИЙ СВЯЗАННЫЙ',
      expected_BB: 'ВЫСОКИЙ СВЯЗАННЫЙ ФД *',
    },
    {
      board: ['Jd', '9h', '5c'],
      expected_SB: 'ВЫСОКИЙ СВЯЗАННЫЙ',
      expected_BB: 'ВЫСОКИЙ СВЯЗАННЫЙ РАД',
    },
    // 4 //
    {
      board: ['Kd', 'Jh', '9c'],
      expected_SB: 'ВЫСОКИЙ СТРИТОВЫЙ',
      expected_BB: 'ВЫСОКИЙ СТРИТОВЫЙ РАД',
    },
    {
      board: ['Kd', 'Jh', 'Tc'],
      expected_SB: 'ВЫСОКИЙ СТРИТОВЫЙ',
      expected_BB: 'ВЫСОКИЙ СТРИТОВЫЙ РАД *★',
    },
    {
      board: ['Qd', 'Th', '9d'],
      expected_SB: 'ВЫСОКИЙ СТРИТОВЫЙ',
      expected_BB: 'ВЫСОКИЙ СТРИТОВЫЙ ФД',
    },
    {
      board: ['Jd', '9h', '8c'],
      expected_SB: 'ВЫСОКИЙ СТРИТОВЫЙ',
      expected_BB: 'ВЫСОКИЙ СТРИТОВЫЙ РАД',
    },
    {
      board: ['9d', '8h', '5c'],
      expected_SB: 'ВЫСОКИЙ СТРИТОВЫЙ',
      expected_BB: 'НИЗКИЙ СТРИТОВЫЙ РАД 6xx+',
    },
    // 5 //
    {
      board: ['7d', '5h', '2c'],
      expected_SB: 'НИЗКИЙ',
      expected_BB: 'НИЗКИЙ РАД',
    },
    {
      board: ['6d', '7h', '2h'],
      expected_SB: 'НИЗКИЙ',
      expected_BB: 'НИЗКИЙ ФД',
    },
    { 
      board: ['8d', '2h', '3d'],
      expected_SB: 'НИЗКИЙ',
      expected_BB: 'НИЗКИЙ ФД',
    },
    // 6 //
    { 
      board: ['9d', '6h', '3d'],
      expected_SB: 'ВЫСОКИЙ СВЯЗАННЫЙ',
      expected_BB: 'НИЗКИЙ ФД',
    },
    { 
      board: ['8d', '6h', '4c'],
      expected_SB: 'НИЗКИЙ СТРИТОВЫЙ',
      expected_BB: 'НИЗКИЙ СТРИТОВЫЙ РАД 6xx+',
    },
    { 
      board: ['7d', '4h', '3h'],
      expected_SB: 'НИЗКИЙ СТРИТОВЫЙ',
      expected_BB: 'НИЗКИЙ СТРИТОВЫЙ ФД',
    },
    {
      board: ['6d', '2h', '4h'],
      expected_SB: 'НИЗКИЙ СТРИТОВЫЙ',
      expected_BB: 'НИЗКИЙ СТРИТОВЫЙ ФД',
    },
    {
      board: ['9d', '7h', '5c'],
      expected_SB: 'ВЫСОКИЙ СТРИТОВЫЙ',
      expected_BB: 'НИЗКИЙ СТРИТОВЫЙ РАД 6xx+',
    },
    // 7 //
    {
      board: ['2d', '2h', '5c'],
      expected_SB: 'НИЗКИЙ СПАРЕННЫЙ',
      expected_BB: 'НИЗКИЙ СПАРЕННЫЙ РАД 5xx-',
    },
    {
      board: ['6d', '7d', '6c'],
      expected_SB: 'НИЗКИЙ СПАРЕННЫЙ',
      expected_BB: 'НИЗКИЙ СПАРЕННЫЙ ФД 7xx+',
    },
    {
      board: ['8d', '8h', '7s'],
      expected_SB: 'НИЗКИЙ СПАРЕННЫЙ',
      expected_BB: 'НИЗКИЙ СПАРЕННЫЙ РАД 887/877',
    },
    {
      board: ['8d', '7h', '7s'],
      expected_SB: 'НИЗКИЙ СПАРЕННЫЙ',
      expected_BB: 'НИЗКИЙ СПАРЕННЫЙ РАД 887/877',
    },
    {
      board: ['8d', '8h', '3d'],
      expected_SB: 'НИЗКИЙ СПАРЕННЫЙ',
      expected_BB: 'НИЗКИЙ СПАРЕННЫЙ ФД 7xx+',
    },
    {
      board: ['8d', '8s', '3c'],
      expected_SB: 'НИЗКИЙ СПАРЕННЫЙ',
      expected_BB: 'НИЗКИЙ СПАРЕННЫЙ РАД 6xx+',
    },
    {
      board: ['6d', '6h', '5h'],
      expected_SB: 'НИЗКИЙ СПАРЕННЫЙ',
      expected_BB: 'НИЗКИЙ СПАРЕННЫЙ ФД 6xx',
    },
    {
      board: ['3d', '3h', '5h'],
      expected_SB: 'НИЗКИЙ СПАРЕННЫЙ',
      expected_BB: 'НИЗКИЙ СПАРЕННЫЙ ФД 5xx-',
    },
    // 8 //
    {
      board: ['Ad', 'Ah', '7c'],
      expected_SB: 'СПАРЕННЫЙ ВЫСОКИЙ НИЗ. Пара',
      expected_BB: 'СПАРЕННЫЙ ВЫСОКИЙ НИЗ. Пара РАД xx6+',
    },
    {
      board: ['Kd', 'Kh', '3d'],
      expected_SB: 'СПАРЕННЫЙ ВЫСОКИЙ НИЗ. Пара',
      expected_BB: 'СПАРЕННЫЙ ВЫСОКИЙ НИЗ. Пара ФД xx5-',
    },
    {
      board: ['Jd', 'Jh', '5h'],
      expected_SB: 'СПАРЕННЫЙ ВЫСОКИЙ НИЗ. Пара',
      expected_BB: 'СПАРЕННЫЙ ВЫСОКИЙ НИЗ. Пара ФД xx5-',
    },
///исключ
    {
      board: ['8d', '9h', '9c'],
      expected_SB: 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара',
      expected_BB: 'СПАРЕННЫЙ ВЫСОКИЙ НИЗ. Пара РАД xx6+',
    },
    {
      board: ['Qd', 'Th', 'Td'],
      expected_SB: 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара',
      expected_BB: 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара ФД',
    },
    {
      board: ['Td', 'Jh', 'Jh'],
      expected_SB: 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара',
      expected_BB: 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара ФД',
    },
    // 9 //
    {
      board: ['Ad', 'Ah', '9c'],
      expected_SB: 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара',
      expected_BB: 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара РАД НЕ СВЯЗ x66+',
    },
    {
      board: ['6d', '6h', 'Jc'],
      expected_SB: 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара',
      expected_BB: 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара РАД НЕ СВЯЗ x66+',
    },
    {
      board: ['Td', 'Th', 'Jd'],
      expected_SB: 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара',
      expected_BB: 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара ФД',
    },
    {
      board: ['9d', '9h', 'Qh'],
      expected_SB: 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара',
      expected_BB: 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара ФД',
    },
    {
      board: ['Td', '4h', '4h'],
      expected_SB: 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара',
      expected_BB: 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара ФД',
    },
    {
      board: ['9d', '5h', '5c'],
      expected_SB: 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара',
      expected_BB: 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара РАД * СВЯЗ Jxx-',
    },
    {
      board: ['Td', 'Th', '9c'],
      expected_SB: 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара',
      expected_BB: 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара РАД * СВЯЗ Jxx-',
    },
    // 10 //
    {
      board: ['Ad', 'Jd', '4d'],
      expected_SB: 'МОНОТОННЫЙ',
      expected_BB: 'МОНОТОННЫЙ',
    },
    {
      board: ['Jd', 'Td', '3d'],
      expected_SB: 'МОНОТОННЫЙ',
      expected_BB: 'МОНОТОННЫЙ',
    },

/////////////////////////////
    {
      board: ['9s', '5c', '4h'],
      expected_SB: 'ВЫСОКИЙ СВЯЗАННЫЙ',
      expected_BB: 'НИЗКИЙ РАД',
    },
  ];

  testCases.forEach((test) => {
    const resultSB = defineFlopSB(test.board);
    const resultBB = defineFlopBB(test.board);
    console.assert(resultSB === test.expected_SB, `SB: For board ${test.board}, expected ${test.expected_SB}, but got ${resultSB}`);
    console.assert(resultBB === test.expected_BB, `BB: For board ${test.board}, expected ${test.expected_BB}, but got ${resultBB}`);
  });
}  
testDefineFlopType();



function testFindCombination() {
  const testCases = [
    {
      hand: ['Ah', 'Kh'],
      board: ['Qh', 'Jh', 'Th'],
      expected: 'Royal Flush',
    },
    {
      hand: ['Qh', 'Jh'],
      board: ['Th', '9h', '8h'],
      expected: 'Straight Flush',
    },
    {
      hand: ['2s', '3s'],
      board: ['4s', '5s', '6s'],
      expected: 'Straight Flush',
    },
    {
      hand: ['Ah', '2h'],
      board: ['3h', '4h', '5h'],
      expected: 'Straight Flush',
    },
    {
      hand: ['8s', '8c'],
      board: ['8h', '8d', '2h'],
      expected: 'Quads',
    },
    {
      hand: ['9h', '9d'],
      board: ['5s', '9c', '5h'],
      expected: 'Full House',
    },  
    {
      hand: ['3h', '5h'],
      board: ['Th', 'Kh', '7h'],
      expected: 'Flush',
    },
    {
      hand: ['8d', '9d'],
      board: ['Ts', 'Qc', 'Jh'],
      expected: 'Straight',
    },
    {
      hand: ['Td', 'Jd'],
      board: ['Jc', 'Js', 'Ad'],
      expected: 'Trips',
    },
    {
      hand: ['6d', '6s'],
      board: ['5c', 'Ts', '6c'],
      expected: 'Set',
    },
    {
      hand: ['9c', 'Js'],
      board: ['Ad', '9h', 'Jc'],
      expected: 'Doper',
    },
    {
      hand: ['Kd', 'Ks'],
      board: ['6c', '7s', '8c'],
      expected: 'Overpair',
    },

    { hand: ['Qc', '3s'],
      board: ['Qd', '5h', '2c'],
      expected: 'Top Pair',
    },
    { hand: ['Qc', 'Qs'],
      board: ['Kd', '8h', 'Jd'],
      expected: 'Under Pair',
    },
    { hand: ['Td', '5s'],
      board: ['Ac', 'Ts', '8c'],
      expected: '2-nd Pair',
    },
    { hand: ['7h', 'Kh'],
      board: ['8h', '7c', 'Ah'],
      expected: '3-rd Pair',
    },
    {
      hand: ['2d', '2s'],
      board: ['9c', '3d', '8c'],
      expected: 'Weak Pair',
    },
    {
      hand: ['Ac', '3s'],
      board: ['5d', '6h', 'Tc'],
      expected: '1TH',
    },
    {
      hand: ['Jc', 'Ks'],
      board: ['8d', '7h', '9d'],
      expected: '2TH',
    },
    {
      hand: ['8h', '3h'],
      board: ['Ac', '7s', '6h'],
      expected: 'Nothing',
    },
  ];

  testCases.forEach((test) => {
    const result = findCombination(test.hand, test.board);
    console.assert(result.comb.rank === test.expected, `For hand ${test.hand} and board ${test.board}, expected ${test.expected}, but got ${result.comb.rank}`);
  });
}    
// testFindCombination();


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function testFind_SD() {
  const testCases = [
    {
      hand: ['9s', 'Ks'],
      board: ['Jh', 'Ah', 'Qc'],
      expected: 'Gutshot (1 card)',
    },
    {
      hand: ['Ts', '9s'],
      board: ['Jh', 'Ah', 'Qc'],
      expected: 'OESD (2 card)',
    },
    {
      hand: ['Ts', '8s'],
      board: ['Ah', 'Qh', 'Jc'],
      expected: 'DBB (2 card)',
    },
    {
      hand: ['6s', 'Qs'],
      board: ['8h', '5h', '7c'],
      expected: 'OESD (1 card)',
    },
    {
      hand: ['Js', '9s'],
      board: ['Ah', 'Kh', 'Qc'],
      expected: 'Gutshot (1 card)',
    },
    {
      hand: ['Ks', '9s'],
      board: ['Jh', '8h', 'Qc'],
      expected: 'Gutshot (2 card)',
    },
    {
      hand: ['As', 'Kd'],
      board: ['Qd', 'Jd', '4h'],
      expected: 'Gutshot (2 card)',
    },
    {
      hand: ['9s', '8h'],
      board: ['Qc', 'Jh', 'Ts'],
      expected: 'Straight already',
    },
    {
      hand: ['As', '3d'],
      board: ['7d', '5d', '4h'],
      expected: 'DBB (2 card)',
    },
    {
      hand: ['Js', '9d'],
      board: ['8d', '7d', '5h'],
      expected: 'DBB (2 card)',
    },
    {
      hand: ['Js', '8d'],
      board: ['9d', '7d', '5h'],
      expected: 'DBB (2 card)',
    },
    {
      hand: ['6s', '3d'],
      board: ['9d', '7d', '5h'],
      expected: 'DBB (2 card)',
    },
    { hand: ['7s', '4s'],
      board: ['9c', '6h', '5s'],
      expected: 'OESD (2 card)',
    },
    { hand: ['Ts', '8s'],
      board: ['Kc', 'Qh', 'Js'],
      expected: 'OESD (1 card)',
    },
    { hand: ['8s', '6s'],
      board: ['Jc', 'Th', '9s'],
      expected: 'OESD (1 card)',
    },
    { hand: ['8s', '5s'],
      board: ['Tc', '7h', '6s'],
      expected: 'OESD (2 card)',
    },
    {
      hand: ['As', '3d'],
      board: ['7d', '2d', '4h'],
      expected: 'Gutshot (2 card)',
    },
    {
      hand: ['Ts', '6h'],
      board: ['5c', '4h', '3s'],
      expected: 'OESD (1 card)',
    },
    {
      hand: ['As', '5h'],
      board: ['4c', '3h', '4s'],
      expected: 'Gutshot (2 card)',
    },
    {
      hand: ['As', '2h'],
      board: ['6c', '4h', '3s'],
      expected: 'Gutshot (1 card)',
    },
    {
      hand: ['3s', '4h'],
      board: ['8c', '6h', '5s'],
      expected: 'OESD (2 card)',
    },
    {
      hand: ['Ks', 'Jh'],
      board: ['Qc', 'Th', '2s'],
      expected: 'OESD (2 card)',
    },
    {
      hand: ['Ks', 'Jh'],
      board: ['Tc', '8h', 'Qs'],
      expected: 'OESD (2 card)',
    },
    {
      hand: ['9s', '7h'],
      board: ['Tc', '8h', '5s'],
      expected: 'OESD (2 card)',
    },
    {
      hand: ['7s', '5h'],
      board: ['4c', '3h', '2s'],
      expected: 'OESD (2 card)',
    },
    {
      hand: ['Qs', '9h'],
      board: ['Tc', '8h', '2s'],
      expected: 'Gutshot (2 card)',
    },
    {
      hand: ['8s', '7h'],
      board: ['Tc', '9h', '2s'],
      expected: 'OESD (2 card)',
    },
    {
      hand: ['9s', '8h'],
      board: ['Tc', '7h', '2s'],
      expected: 'OESD (2 card)',
    },
    {
      hand: ['Ts', '9h'],
      board: ['8c', '7h', '2s'],
      expected: 'OESD (2 card)',
    },
    {
      hand: ['Ts', '3h'],
      board: ['Qc', 'Jh', '9s'],
      expected: 'OESD (1 card)',
    },
    {
      hand: ['9s', '2h'],
      board: ['Qc', 'Jh', 'Ts'],
      expected: 'OESD (1 card)',
    },
    {
      hand: ['Ks', '7h'],
      board: ['Tc', '9h', '8s'],
      expected: 'OESD (1 card)',
    },
  ];

  testCases.forEach((test) => {
    console.log('test: ', `[${test.board}]-[${test.hand}]`);
    const result = find_SD(test.hand, test.board);
    console.assert(result[0] === test.expected, `For hand ${test.hand} and board ${test.board}, expected ${test.expected}, but got ${result[0]}`);
  });
}    
// testFind_SD();

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function testFind_BDSD() {
  const testCases = [
    {
      hand: ['Js', '5h'],
      board: ['Th', '7c', '2d'],
      expected: 'BDGutshot (1 card)',
    },
    {
      hand: ['Js', '8h'],
      board: ['Tc', '3h', '2s'],
      expected: 'BDOESD (2 card)',
    },
    {
      hand: ['4s', '2h'],
      board: ['Tc', '9h', '3s'],
      expected: 'BDOESD (2 card)',
    },
    {
      hand: ['Js', '3h'],
      board: ['Tc', '8h', '3s'],
      expected: 'BDOESD (1 card)',
    },
    {
      hand: ['Qs', '3h'],
      board: ['Tc', 'Jh', '3s'],
      expected: 'BDOESD (1 card)',
    },
    {
      hand: ['5s', '2h'],
      board: ['Kc', 'Th', '6s'],
      expected: 'BDGutshot (2 card)',
    },
    {
      hand: ['7s', '5h'],
      board: ['Tc', '8h', '3s'],
      expected: 'BDOESD (2 card)',
    },
    {
      hand: ['4s', '2h'],
      board: ['9c', '8h', '7s'],
      expected: 'NO BDSD',
    },
    {
      hand: ['Ks', 'Jh'],
      board: ['Tc', '8h', '3s'],
      expected: 'BDOESD (2 card)',
    },
    {
      hand: ['Qs', '4h'],
      board: ['9c', '7h', '6s'],
      expected: 'BDOESD (1 card)',
    },
    {
      hand: ['Ks', '2h'],
      board: ['Jc', 'Th', '8s'],
      expected: 'BDOESD (1 card)',
    },
    {
      hand: ['Js', '4h'],
      board: ['8c', '7h', '8s'],
      expected: 'BDGutshot (1 card)',
    },
    {
      hand: ['Ks', '4h'],
      board: ['Jc', '9h', '8s'],
      expected: 'BDGutshot (1 card)',
    },
    {
      hand: ['7s', '6h'],
      board: ['8c', '8h', '2s'],
      expected: 'BDOESD (2 card)',
    },
  ];

  testCases.forEach((test) => {
    const result = find_BDSD(test.hand, test.board);
    console.assert(result[0] === test.expected, `For hand ${test.hand} and board ${test.board}, expected ${test.expected}, but got ${result[0]}`);
  });
}    
// testFind_BDSD();