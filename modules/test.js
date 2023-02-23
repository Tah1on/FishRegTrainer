import { findCombination, } from './findCombination.js';
import { findFlushDraw, find_SD, find_BDSD } from './findDraw.js';

/////////////////////////////////////////////////
//////// ТЕСТЫ ////////
/////////////////////////////////////////////////

export function testFindCombination(testData) {
  for (let i in testData) {
    let flop = testData[i][1].slice(-3);
    let flopPlayer = testData[i][1];
    let player = testData[i][1].slice(0, 2);
    let funcResult = findCombination(flop, flopPlayer, player);
    if (funcResult === testData[i][0]) {
      console.log('test comb pass', i);
    } else {
      console.log('test comb failed', i, funcResult);
    }
  } 
}
  
let testData = [  
  ['Royal Flush',
        ['Ah', 'Kh', 'Qh', 'Jh', 'Th'],  '00'],    
  ['Straight Flush',
        ['Qh', 'Jh', 'Th', '9h', '8h'],  '01'],
  ['Straight Flush',
        ['2s', '3s', '4s', '5s', '6s'],  '02'],
  ['Straight Flush',
        ['Ah', '2h', '3h', '4h', '5h'],  '03'],
  ["Quads",
        ['8s', '8c', '8h', '8d', '2h'],  '04'], 
  ['Full House',
        ['9h', '9d', '5s', '9c', '5h'],  '05'],
  ['Flush',
        ['3h', '5h', 'Th', 'Kh', '7h'],  '06'],
  ['Straight',
        ['8d', '9d', 'Ts', 'Qc', 'Jh'],  '07'],
  ['Trips',
        ['Td', 'Jd', 'Jc', 'Js', 'Ad'],  '08'],
  ['Set',
        ['6d', '6s', '5c', 'Ts', '6c'],  '09'],
  ['TWO Pair',
        ['9c', 'Js', 'Ad', '9h', 'Jc'],  '10'],
  ['Overpair',
        ['Kd', 'Ks', '6c', '7s', '8c'],  '11'],
  ['Top Pair',
        ['Qc', '3s', 'Qd', '5h', '2c'],  '12'],
  ['Under Pair',
        ['Qc', 'Qs', 'Kd', '8h', 'Jd'],  '13'],
  ['2-nd Pair',
        ['Td', '5s', 'Ac', 'Ts', '8c'],  '14'],
  ['3-nd Pair',
        ['7h', 'Kh', '8h', '7c', 'Ah'],  '15'],
  ['Weak Pair',
        ['2d', '2s', '9c', '3d', '8c'],  '16'],
  ['1TX',
        ['Ac', '3s', '5d', '6h', 'Tc'],  '17'],
  ['2TX',
        ['Jc', 'Ks', '8d', '7h', '9d'],  '18'],
  ['Nothing',
        ['8h', '3h', 'Ac', '7s', '6h'],  '19'],
]

// testFindCombination(testData)

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function testFind_SD() {
  const testCases = [
    {
      hand: ['9s', 'Ks'],
      board: ['Jh', 'Ah', 'Qc'],
      expected: 'Gutshot (1 card)'
    },
    {
      hand: ['Ts', '9s'],
      board: ['Jh', 'Ah', 'Qc'],
      expected: 'OESD (2 card)'
    },
    {
      hand: ['Ts', '8s'],
      board: ['Ah', 'Qh', 'Jc'],
      expected: 'DBB (2 card)'
    },
    {
      hand: ['6s', 'Qs'],
      board: ['8h', '5h', '7c'],
      expected: 'OESD (1 card)'
    },
    {
      hand: ['Js', '9s'],
      board: ['Ah', 'Kh', 'Qc'],
      expected: 'Gutshot (1 card)'
    },
    {
      hand: ['Ks', '9s'],
      board: ['Jh', '8h', 'Qc'],
      expected: 'Gutshot (2 card)'
    },
    {
      hand: ['As', 'Kd'],
      board: ['Qd', 'Jd', '4h'],
      expected: 'Gutshot (2 card)'
    },
    {
      hand: ['9s', '8h'],
      board: ['Qc', 'Jh', 'Ts'],
      expected: 'Straight already'
    },
    {
      hand: ['As', '3d'],
      board: ['7d', '5d', '4h'],
      expected: 'DBB (2 card)'
    },
    {
      hand: ['Js', '9d'],
      board: ['8d', '7d', '5h'],
      expected: 'DBB (2 card)'
    },
    {
      hand: ['Js', '8d'],
      board: ['9d', '7d', '5h'],
      expected: 'DBB (2 card)'
    },
    {
      hand: ['6s', '3d'],
      board: ['9d', '7d', '5h'],
      expected: 'DBB (2 card)'
    },
    { hand: ['7s', '4s'],
      board: ['9c', '6h', '5s'],
      expected: 'OESD (2 card)'
    },
    { hand: ['Ts', '8s'],
      board: ['Kc', 'Qh', 'Js'],
      expected: 'OESD (1 card)'
    },
    { hand: ['8s', '6s'],
      board: ['Jc', 'Th', '9s'],
      expected: 'OESD (1 card)'
    },
    { hand: ['8s', '5s'],
      board: ['Tc', '7h', '6s'],
      expected: 'OESD (2 card)'
    },
    {
      hand: ['As', '3d'],
      board: ['7d', '2d', '4h'],
      expected: 'Gutshot (2 card)'
    },
    {
      hand: ['Ts', '6h'],
      board: ['5c', '4h', '3s'],
      expected: 'OESD (1 card)'
    },
    {
      hand: ['As', '5h'],
      board: ['4c', '3h', '4s'],
      expected: 'Gutshot (2 card)'
    },
    {
      hand: ['As', '2h'],
      board: ['6c', '4h', '3s'],
      expected: 'Gutshot (1 card)'
    },
    {
      hand: ['3s', '4h'],
      board: ['8c', '6h', '5s'],
      expected: 'OESD (2 card)'
    },
    {
      hand: ['Ks', 'Jh'],
      board: ['Qc', 'Th', '2s'],
      expected: 'OESD (2 card)'
    },
    {
      hand: ['Ks', 'Jh'],
      board: ['Tc', '8h', 'Qs'],
      expected: 'OESD (2 card)'
    },
    {
      hand: ['9s', '7h'],
      board: ['Tc', '8h', '5s'],
      expected: 'OESD (2 card)'
    },
    {
      hand: ['7s', '5h'],
      board: ['4c', '3h', '2s'],
      expected: 'OESD (2 card)'
    },
  ];

  testCases.forEach((test) => {
    const result = find_SD(test.hand, test.board);
    console.assert(result === test.expected, `For hand ${test.hand} and board ${test.board}, expected ${test.expected}, but got ${result}`);
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
      expected: 'BDGutshot (1 card)'
    },
    {
      hand: ['Js', '8h'],
      board: ['Tc', '3h', '2s'],
      expected: 'BDOESD (2 card)'
    },
    {
      hand: ['4s', '2h'],
      board: ['Tc', '9h', '3s'],
      expected: 'BDOESD (2 card)'
    },
    {
      hand: ['Js', '3h'],
      board: ['Tc', '8h', '3s'],
      expected: 'BDOESD (1 card)'
    },
    {
      hand: ['Qs', '3h'],
      board: ['Tc', 'Jh', '3s'],
      expected: 'BDOESD (1 card)'
    },
    {
      hand: ['5s', '2h'],
      board: ['Kc', 'Th', '6s'],
      expected: 'BDGutshot (2 card)'
    },
    {
      hand: ['7s', '5h'],
      board: ['Tc', '8h', '3s'],
      expected: 'BDOESD (2 card)'
    },
    {
      hand: ['4s', '2h'],
      board: ['9c', '8h', '7s'],
      expected: 'NO Backdoor straight draws'
    },
    {
      hand: ['Ks', 'Jh'],
      board: ['Tc', '8h', '3s'],
      expected: 'BDOESD (2 card)'
    },
  ];

  testCases.forEach((test) => {
    const result = find_BDSD(test.hand, test.board);
    console.assert(result === test.expected, `For hand ${test.hand} and board ${test.board}, expected ${test.expected}, but got ${result}`);
  });
}    
// testFind_BDSD();