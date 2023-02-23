import { findCombination, } from './findCombination.js';
import { findFlushDraw, find_SD, find_BDSD, } from './findDraw.js';

/////////////////////////////////////////////////
//////// ТЕСТЫ ////////
/////////////////////////////////////////////////

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
      expected: 'NO Backdoor straight draws',
    },
    {
      hand: ['Ks', 'Jh'],
      board: ['Tc', '8h', '3s'],
      expected: 'BDOESD (2 card)',
    },
  ];

  testCases.forEach((test) => {
    const result = find_BDSD(test.hand, test.board);
    console.assert(result === test.expected, `For hand ${test.hand} and board ${test.board}, expected ${test.expected}, but got ${result}`);
  });
}    
// testFind_BDSD();