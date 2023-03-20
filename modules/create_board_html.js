//
////////// HTML
//

// Заполняем карты
export function updateDeckHtml(flopCards, playerCards) {
  let brd = document.querySelectorAll('.board .card');
  let plr = document.querySelectorAll('.playerHand .card');
  flopCards.forEach((card, index) => {
    brd[index].innerHTML = card[0];
    brd[index].className = 'card';
    if (card[1] === 'h') {
      brd[index].classList.add("card_h");
    } else if (card[1] === 'd') {
      brd[index].classList.add("card_d");
    } else if (card[1] === 's') {
      brd[index].classList.add("card_s");
    } else {
      brd[index].classList.add("card_c");
    }
  });
  playerCards.forEach((card, index) => {
    plr[index].innerHTML = card[0];
    plr[index].className = 'card';
    if (card[1] === 'h') {
      plr[index].classList.add("card_h");
    } else if (card[1] === 'd') {
      plr[index].classList.add("card_d");
    } else if (card[1] === 's') {
      plr[index].classList.add("card_s");
    } else {
      plr[index].classList.add("card_c");
    }
  });
}

// Заполняем Сombination
export function updateComb(floptype, combination, fd, bdfd, sd, bdsd) {
  let ftCmb = document.querySelector('.combination').children;
  ftCmb[0].innerHTML = floptype;
  ftCmb[1].innerHTML = combination;
  ftCmb[2].innerHTML = fd;
  ftCmb[3].innerHTML = bdfd;
  ftCmb[4].innerHTML = sd;
  ftCmb[5].innerHTML = bdsd;
}

// Очищаем Сombination
export function clearComb() {
  let ftCmb = document.querySelector('.combination').children;
  ftCmb[0].innerHTML = '';
  ftCmb[1].innerHTML = '';
  ftCmb[2].innerHTML = '';
  ftCmb[3].innerHTML = '';
  ftCmb[4].innerHTML = '';
  ftCmb[5].innerHTML = '';
}

// Заполняем списки
export function displayPercentage(finalResult) {
  document.getElementsByClassName("result-list")[0].innerHTML = "";  
  finalResult.forEach(value => {
    let item = document.createElement("li");
    item.innerHTML = `${value.type}: ${value.percent} (${value.count} comb) <div class="progress-bar" style="width: ${value.percent};"></div>`;
    document.getElementsByClassName("result-list")[0].appendChild(item);
  });
}
// Очищаем списки
export function clearResultsPercentage() {
  document.getElementsByClassName("result-list")[0].innerHTML = "";
}