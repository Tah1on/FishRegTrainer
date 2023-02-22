import { getCardsProp, countSuits, countValues, countIndexV } from '../modules/sortSeparateCount.js';
import {defineFlopSB} from '../modules/defineFlopType.js';
import { BOARD, HAND, REZ, COMB } from '../script.js';

// COMB.allCombMade

//
////////// Стратегия игры на флопе
//
// @param flop -> ['Ad', '3c', '9h']
// @returns -> строка 'ВЫСОКИЙ СТРИТОВЫЙ'
export function strategySBFlopCB(flopType, combinations) {
  if ( flopType === 'МОНОТОННЫЙ' ){
    combinations.forEach(combination => {
      combination.combs.forEach(comb => {
        if (comb.comb.strength === 'nuts' ||
            comb.comb.rank === 'Overpair' ||
            comb.comb.rank === 'Top Pair' ||
            comb.comb.rank === 'Under Pair' ||
            comb.comb.rank === '2-nd Pair' && comb.rank.topIndex <= 4) {
              comb.action = {
                bet: true,
                size: '50%',
                check: false,
                };       
        } else if (comb.comb.rank === '2-nd Pair' && comb.rank.topIndex > 4 ||
                   comb.comb.strength === 'low') {
          comb.action = {
            bet: false,
            size: null,
            check: true,
            };       
        } else {
          comb.action = {
            bet: true,
            size: '25%',
            check: false,
            };
        }
      });
    });
    return combinations
////
  } else if ( flopType === 'ТРИ ОДИНАКОВЫЕ' ){
    combinations.forEach(combination => {
      combination.combs.forEach(comb => {
        comb.action = {
          bet: true,
          size: '25%',
          check: false,
          };
      });
    });
    return combinations
////
  } else if (flopType === 'СПАРЕННЫЙ ВЫСОКИЙ НИЗ. Пара' ){
    combinations.forEach(combination => {
      combination.combs.forEach(comb => {
        if (comb.comb.strength === 'nuts' ||
            comb.comb.rank === 'Overpair' ||
            comb.comb.rank === 'Top Pair' && comb.rank.topIndex <= 4) {
              comb.action = {
                bet: true,
                size: '50%',
                check: false,
                };          
        } else {
          comb.action = {
            bet: true,
            size: '25%',
            check: false,
            };
        }
      });
    });
    return combinations
////
  } else if (flopType === 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара' ){
    combinations.forEach(combination => {
      combination.combs.forEach(comb => {
        if (comb.comb.strength === 'nuts' ||
            comb.comb.rank === 'Overpair' ||
            comb.comb.rank === 'Top Pair' && comb.rank.topIndex <= 4) {
              comb.action = {
                bet: true,
                size: '50%',
                check: false,
                };
        } else if (comb.comb.rank === 'Top Pair' && comb.rank.topIndex > 4 ||
                   comb.holeCards.pocket === true && comb.rank.underTPIndex > 0 && comb.rank.rank > 6) {
                    comb.action = {
                      bet: false,
                      size: null,
                      check: true,
                      };

        } else {
          comb.action = {
            bet: true,
            size: '25%',
            check: false,
            };
        }
      });
    });
    return combinations
////
  } else if (flopType === 'ТУЗОВЫЙ СТРИТОВЫЙ' ){
    combinations.forEach(combination => {
      combination.combs.forEach(comb => {
        if (comb.comb.strength === 'nuts' ||
            comb.comb.rank === 'Top Pair'&& comb.rank.topIndex <= 4) {
              comb.action = {
                bet: true,
                size: '75%',
                check: false,
                };       
        } else if (comb.comb.rank === 'Under Pair' ||
                   comb.comb.rank === 'Top Pair' && comb.rank.topIndex > 4 || 
                   comb.comb.rank === '2-nd Pair' && comb.rank.topIndex <= 4) {
                    comb.action = {
                      bet: true,
                      size: '50%',
                      check: false,
                      };            
        } else if (comb.comb.strength === 'low' ||
                   comb.comb.rank === '2-nd Pair' && comb.rank.topIndex > 4) {
                    comb.action = {
                      bet: false,
                      size: null,
                      check: true,
                      };
        } else {
          comb.action = {
            bet: true,
            size: '25%',
            check: false,
            };
        }
      });
    });
    return combinations
////
  } else if (flopType === 'ВЫСОКИЙ СТРИТОВЫЙ' ){
    combinations.forEach(combination => {
      combination.combs.forEach(comb => {
        if (comb.comb.strength === 'nuts' ||
            comb.comb.rank === 'Overpair' ||
            comb.comb.rank === 'Top Pair'&& comb.rank.topIndex <= 4) {
              comb.action = {
                bet: true,
                size: '75%',
                check: false,
                };       
        } else if (comb.comb.rank === 'Under Pair' ||
                   comb.comb.rank === 'Top Pair' && comb.rank.topIndex > 4 || 
                   comb.comb.rank === '2-nd Pair' && comb.rank.topIndex <= 4) {
          comb.action = {
            bet: true,
            size: '50%',
            check: false,
            };     
        } else {
          comb.action = {
            bet: false,
            size: null,
            check: true,
            };
        }
      });
    });
    return combinations
  ////
  } else if ( flopType === 'ТУЗОВЫЙ СВЯЗАННЫЙ' ){
    combinations.forEach(combination => {
      combination.combs.forEach(comb => {
        if (comb.comb.strength === 'nuts' ||
            comb.comb.rank === 'Overpair' ||
            comb.comb.rank === 'Top Pair' && comb.rank.topIndex <= 4) {
              comb.action = {
                bet: true,
                size: '75%',
                check: false,
                };       
        } else if (comb.comb.rank === 'Under Pair' ||
                   comb.comb.rank === 'Top Pair' && comb.rank.topIndex > 4 || 
                   comb.comb.rank === '2-nd Pair' && comb.rank.topIndex <= 4) {
          comb.action = {
            bet: true,
            size: '50%',
            check: false,
            };
        } else if (comb.comb.rank === '2-nd Pair' && comb.rank.topIndex > 4 ||
                  comb.comb.rank === '3-nd Pair') {
          comb.action = {
            bet: true,
            size: '25%',
            check: false,
            };
        } else {
          comb.action = {
            bet: true,
            size: '25%',
            check: false,
            };
        }
      });
    });
    return combinations
////
  } else if ( flopType === 'ВЫСОКИЙ СВЯЗАННЫЙ' ){
    combinations.forEach(combination => {
      combination.combs.forEach(comb => {
        if (comb.comb.strength === 'nuts' ||
            comb.comb.rank === 'Overpair' ||
            comb.comb.rank === 'Top Pair' && comb.rank.topIndex <= 4) {
              comb.action = {
                bet: true,
                size: '75%',
                check: false,
                };       
        } else if (comb.comb.rank === 'Under Pair' ||
                   comb.comb.rank === 'Top Pair' && comb.rank.topIndex > 4 || 
                   comb.comb.rank === '2-nd Pair' && comb.rank.topIndex <= 4) {
          comb.action = {
            bet: true,
            size: '50%',
            check: false,
            };
        } else if (comb.comb.rank === '2-nd Pair' && comb.rank.topIndex > 4 ||
                   comb.comb.strength === 'low') {
                    comb.action = {
                      bet: false,
                      size: null,
                      check: true,
                      };       
        } else {
          comb.action = {
            bet: true,
            size: '25%',
            check: false,
            };
        }
      });
    });
    return combinations
////
} else if (flopType === 'ТУЗОВЫЙ СУХОЙ'){
  combinations.forEach(combination => {
    combination.combs.forEach(comb => {
      if (comb.comb.strength === 'nuts' ||
          comb.comb.rank === 'Overpair' ||
          comb.comb.rank === 'Top Pair' ) {
            comb.action = {
              bet: true,
              size: '50%',
              check: false,
              };     
      } else {
        comb.action = {
          bet: true,
          size: '25%',
          check: false,
          };
      }
    });
  });
  return combinations
////
  } else if (flopType === 'СУХОЙ, 2 ВЫСОКИЕ' ){
    combinations.forEach(combination => {
      combination.combs.forEach(comb => {
        if (comb.holeCards.pocket === true && comb.rank.underTPIndex <= 4) {
          comb.action = {
            bet: false,
            size: null,
            check: true,
            };
        } else if (comb.comb.strength === 'nuts' ||
                   comb.comb.rank === 'Overpair' ||
                   comb.comb.rank === 'Top Pair' ) {
          comb.action = {
            bet: true,
            size: '50%',
            check: false,
            };
        } else if (comb.comb.rank === '2-nd Pair') {
          comb.action = {
            bet: false,
            size: null,
            check: true,
            };       
        } else {
          comb.action = {
            bet: true,
            size: '25%',
            check: false,
            };
        }
      });
    });
    return combinations
////
  } else if ( flopType === 'СУХОЙ, 1 ВЫСОКАЯ' ){
    combinations.forEach(combination => {
      combination.combs.forEach(comb => {
        if (comb.holeCards.pocket === true && comb.rank.underTPIndex <= 4) {
          comb.action = {
            bet: false,
            size: null,
            check: true,
            };
        } else if (comb.comb.strength === 'nuts' ||
                   comb.comb.rank === 'Overpair' ||
                   comb.comb.rank === 'Top Pair' ||
                   comb.comb.rank === '2-nd Pair' && comb.rank.topIndex <= 4) {
          comb.action = {
            bet: true,
            size: '50%',
            check: false,
            };       
        } else {
          comb.action = {
            bet: true,
            size: '25%',
            check: false,
            };
        }
      });
    });
    return combinations
////
  } else if ( flopType === 'НИЗКИЙ, СПАРЕННЫЙ' ){
    combinations.forEach(combination => {
      combination.combs.forEach(comb => {
        comb.action = {
          bet: true,
          size: '50%',
          check: false,
          };
      });
    });
    return combinations
////
  } else if ( flopType === 'НИЗКИЙ, СТРИТОВЫЙ' ){
    combinations.forEach(combination => {
      combination.combs.forEach(comb => {
        if (comb.comb.strength === 'nuts' ||
            comb.comb.rank === 'Overpair' ||
            comb.comb.rank === 'Top Pair' && comb.rank.topIndex <= 4) {
              comb.action = {
                bet: true,
                size: '75%',
                check: false,
                };       
        } else if (comb.comb.rank === 'Top Pair' && comb.rank.topIndex > 4 ||
                   comb.comb.rank === 'Under Pair' ||
                   comb.comb.rank === '2-nd Pair') {
          comb.action = {
            bet: true,
            size: '50%',
            check: false,
            };       
        } else {
          comb.action = {
            bet: true,
            size: '25%',
            check: false,
            };
        }
      });
    });
    return combinations
////
  } else if ( flopType === 'НИЗКИЙ' ){
    combinations.forEach(combination => {
      combination.combs.forEach(comb => {
        if (comb.comb.strength === 'nuts' ||
            comb.comb.rank === 'Overpair' ||
            comb.comb.rank === 'Top Pair') {
              comb.action = {
                bet: true,
                size: '75%',
                check: false,
                };       
        } else if (comb.comb.rank === 'Under Pair' ||
                   comb.comb.rank === '2-nd Pair') {
          comb.action = {
            bet: true,
            size: '50%',
            check: false,
            };       
        } else {
          comb.action = {
            bet: true,
            size: '25%',
            check: false,
            };
        }
      });
    });
    return combinations
  }
}


export function sumActions(combinations) {
  let actions = {
    check: {
      percent: 0,
      count: 0,
      cards: []
    },
    bet: {
      percent: 0,
      count: 0,
      size: {}
    }
  }
  let totalCount = 0;  
  combinations.forEach(comb => {
    comb.combs.forEach(item => {
      let { check, bet, size } = item.action;
      if (check) {
        actions.check.count++;
        actions.check.cards.push(item.holeCards.cards);
        totalCount++;
      } else if (bet) {
        actions.bet.count++;
        if (!actions.bet.size[size]) {
          actions.bet.size[size] = {
            count: 1,
            cards: [item.holeCards.cards]
          };
        } else {
          actions.bet.size[size].count++;
          actions.bet.size[size].cards.push(item.holeCards.cards);
        }
        totalCount++;
      }
    });
  });
  actions.check.percent = (actions.check.count / totalCount * 100).toFixed(2);
  actions.bet.percent = (actions.bet.count / totalCount * 100).toFixed(2);
  Object.entries(actions.bet.size).forEach(([size, value]) => {
    value.percent = (value.count / totalCount * 100).toFixed(2);
  });
  return actions;
}


////////// Стратегия игры на флопе с полученными картами
export function getCombinationAction(allBoardCombinations, combination, playerCards) {
  const foundCombination = allBoardCombinations.find(obj => obj.type === combination);
  if (!foundCombination) {
    console.log('Combination not found');
    return;
  }  
  let action = 'Unknown action';
  
  foundCombination.combs.forEach(item => {
    if (item.holeCards.cardsArr.includes(playerCards[0]) && item.holeCards.cardsArr.includes(playerCards[1])) {
      if (item.action.check) {
        action = 'check';
      } else if (item.action.bet) {
        action = `CB ${item.action.size}`;
      }
    }
  });
  return action;
}




// export function sumActions(combinations) {
  
//   let actions = {
//     check: {
//       count: 0,
//       cards: [],
//       },
//     bet: {
//       total: 0,
//       size: {
//         count: 0,
//         cards: [],
//         }
//     }
//   }
//   let totalCount = 0;  
//   combinations.forEach(comb => {
//     comb.combs.forEach(item => {
//       let { check, bet, size,  } = item.action;
      
//       if (check) {
//         actions.check.count++;
//         actions.check.cards.push(item.holeCards.cards);
//         totalCount++;
//       } else if (bet) {
//         actions.bet.total++;
//         actions.bet.size[size] = actions.bet.size[size] ? actions.bet.size[size] + 1 : 1;
//         actions.bet.size.cards.push(item.holeCards.cards);
//         totalCount++;
//       }
//     });
//   });

//   actions.check = `check: ${(actions.check.count / totalCount * 100).toFixed(2)}% (${actions.check.count}comb)`;
//   actions.bet.total = ` cbet: ${(actions.bet.total / totalCount * 100).toFixed(2)}% (${actions.bet.total}comb)`;
//   actions.bet.size = Object.entries(actions.bet.size)
//   .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
//   .map(([size, count]) => {
//     return ` size ${size}: ${(count / totalCount * 100).toFixed(2)}% (${count}comb)`;
//   });
//   console.log('actions: ', actions);
//   return [actions.check, actions.bet.total, ...actions.bet.size];
// }


// function addAction(combinations) {
//   combinations.forEach(combination => {
//     combination.combs.forEach(comb => {
//       if (comb.holeCards.pocket === true && comb.rank.underTPIndex >= 0 && comb.rank.underTPIndex <= 4) {
//         comb.action = {
//           bet: false,
//           size: null,
//           check: true,
//         };        
//       } else {
//         comb.action = {
//           bet: true,
//           size: '50%',
//           check: false,
//         };
//       }
//     });
//   });
//   return combinations;
// }