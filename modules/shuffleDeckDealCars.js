//// МЕШАЕМ и РАЗДАЕМ КАРТЫ

//// Функция берет ключи колоды. Возвращает перемешанный массив карт
// @param deck -> [{Ad}, {Ah}...]
// @returns -> [Ad, 5c, Ts....]
export const shuffle = deck => {
  let deckArray = Object.keys(deck);
  for (let i = deckArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deckArray[i], deckArray[j]] = [deckArray[j], deckArray[i]];
  }
  return deckArray;
};

//// Функция раздает карты и удаляет их из колоды
// @param shuffleDeck -> [Ad, 5c, Ts....]
// @param numberOfCards -> 3
// @returns -> [Ad, 5c, Ts....]
export const dealCards = (shuffleDeck, numberOfCards) => {
  let recipientCards = [];
  for (let i = 0; i < numberOfCards; i++) {
    recipientCards.push(shuffleDeck.pop());
  }
  return recipientCards;
};