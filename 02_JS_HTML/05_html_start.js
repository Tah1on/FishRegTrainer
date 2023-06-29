import { 
  createToggle, 
  createToggleOnOff, 
  getToggle_SB_BB_Status, 
  getTogglesStatusFlop,
  getTogglesStatusHand,
  } from './01_switch_zone.js';
import { 
  createBoard, 
  createPlayerHand, 
  createChoiceActions, 
  createHandInfo, 
  createActionButtons,
  } from './02_trainer_zone.js';
import { 
  makeMatrix, 
  makeActionInfo,
  } from './03_range_zone.js';
import { 
  displayCombsAllCount, 
  displayGroupHands, 
  displayPercentageSB, 
  displayPercentageBB, 
  clearResultsPercentage,
  } from './04_combs_zone.js';

// MODULES
import { 
  VALUES, 
  SUITS,
} from '../03_JS_MODULES/deck.js';



/// ФУНКЦИЯ. СОЗДАЕТ HTML ЭЛЕМНТЫ первый запуск
export function startApp() {
  /////////////////////////////////////////////////////////////////
  //// 01. ЗОНА НАСТРОЕК
  
  // ПОЛУЧАЕМ ИЗ HTML КОНТЕЙНЕР
  const switchFlopZone = document.querySelector(".switch-flop-zone");  
  // СОЗДАЕМ МЕНЮ - ВЫБОР ПОЗЫ SB/BB
  const menu_flopType_SB_BB = document.createElement('div');
  menu_flopType_SB_BB.classList.add('menu-flopType-SB-BB');  
  // СОЗДАЕМ ПЕРЕКЛЮЧАТЕЛЬ
  createToggle(menu_flopType_SB_BB, 'flopType_SB_BB', 'SB', 'BB');
  
  // СОЗДАЕМ МЕНЮ - ВЫБОР ФИЛЬТРА
  const menu_flopType_toggles = document.createElement('div');
  menu_flopType_toggles.classList.add('menu-flopType-toggles');  
  // СОЗДАЕМ ПЕРЕКЛЮЧАТЕЛИ
  createToggleOnOff(menu_flopType_toggles, 'СУХОЙ 2 ВЫСОКИЕ', '', '2В1Н');
  createToggleOnOff(menu_flopType_toggles, 'СУХОЙ 1 ВЫСОКАЯ', '', '1В2Н');
  createToggleOnOff(menu_flopType_toggles, 'ВЫСОКИЙ СВЯЗАННЫЙ', '', '↑СВЯЗАН');
  createToggleOnOff(menu_flopType_toggles, 'ВЫСОКИЙ СТРИТОВЫЙ', '', '↑СТРИТ');
  createToggleOnOff(menu_flopType_toggles, 'НИЗКИЙ', '', 'НИЗКИЙ');
  createToggleOnOff(menu_flopType_toggles, 'НИЗКИЙ СТРИТОВЫЙ', '', '↓СТРИТ');
  createToggleOnOff(menu_flopType_toggles, 'НИЗКИЙ СПАРЕННЫЙ', '', '↓СПАР');
  createToggleOnOff(menu_flopType_toggles, 'СПАРЕННЫЙ ВЫСОКИЙ НИЗ. Пара', '', '↑СПАР↓П');
  createToggleOnOff(menu_flopType_toggles, 'СПАРЕННЫЙ ВЫСОКИЙ ВЫС. Пара', '', '↑СПАР↑П');
  createToggleOnOff(menu_flopType_toggles, 'ТРИ ОДИНАКОВЫЕ', '', '3 ОДИН');
  createToggleOnOff(menu_flopType_toggles, 'МОНОТОННЫЙ', '', 'МОНОТ');
  // ЗАНОСИМ В КОНТЕЙНЕРЫ
  switchFlopZone.appendChild(menu_flopType_SB_BB);
  switchFlopZone.appendChild(menu_flopType_toggles);

  // ПОЛУЧАЕМ ИЗ HTML КОНТЕЙНЕР
  const switchHandZone = document.querySelector(".switch-hand-zone"); 
  // СОЗДАЕМ МЕНЮ - ВЫБОР ФИЛЬТРА
  const menu_handType_toggles = document.createElement('div');
  menu_handType_toggles.classList.add('menu-handType-toggles');  
  // СОЗДАЕМ ПЕРЕКЛЮЧАТЕЛИ
  createToggleOnOff(menu_handType_toggles, 'ГОТОВЫЕ', '', 'ГОТОВЫЕ');
  createToggleOnOff(menu_handType_toggles, 'ВОЗДУХ', '', 'ВОЗДУХ');
  createToggleOnOff(menu_handType_toggles, 'ДРО', '', 'ДРО');
  createToggleOnOff(menu_handType_toggles, 'TH', '', 'ТХ');
  createToggleOnOff(menu_handType_toggles, 'BD', '', 'BD');
  // ЗАНОСИМ В КОНТЕЙНЕР
  switchHandZone.appendChild(menu_handType_toggles);


  
  /////////////////////////////////////////////////////////////////
  //// 02. ЗОНА ТРЕНАЖЕРА
  
  // ПОЛУЧАЕМ ИЗ HTML КОНТЕЙНЕР
  const trainerZone = document.querySelector(".trainer-zone");
  // ЗОНА КАРТ БОРДА
  createBoard(trainerZone);
  // ЗОНА КАРТ ИГРОКА
  createPlayerHand(trainerZone);
  // ЗОНА ВЫБОРА ДЕЙСТВИЙ
  createChoiceActions(trainerZone);
  // ЗОНА ИНФЫ ПО РУКЕ
  createHandInfo(trainerZone);  
  // СОЗДАЕМ КНОПКИ ДЕЙСТВИЙ
  createActionButtons(document.querySelector(".choice-actions-zone"));



  /////////////////////////////////////////////////////////////////
  //// 03. ЗОНА ДИАПАЗОНА
  const matrixContainer = document.querySelector('.matrix-zone');
  // ДОБАВЛЯЕМ МАТРИЦУ НА СТРАНИЦУ
  makeMatrix(matrixContainer, VALUES, SUITS);  
  // ДОБАВЛЯЕМ ИНФРМАЦИЮ ПО ДЕЙСТВИЯМ НА СТРАНИЦУ
  let actionInfoZone = document.querySelector('.action-info-zone');
  makeActionInfo(actionInfoZone);  
  
  // ДОБАВЛЯЕМ ИВЕНТ НА СМЕНУ ПОЗЫ SB / BB
  const sbButtons = document.querySelector('.sb-buttons');
  const bbButtons = document.querySelector('.bb-buttons');
  const input_SB_BB = document.querySelector('.toggle-input');
  // скрываем кнопки действий
  input_SB_BB.addEventListener('change', () => {
    if (input_SB_BB.checked) {
      sbButtons.classList.remove('active');
      sbButtons.classList.add('none');
      bbButtons.classList.remove('none');
      bbButtons.classList.add('active');
    } else {
      sbButtons.classList.remove('none');
      sbButtons.classList.add('active');
      bbButtons.classList.remove('active');
      bbButtons.classList.add('none');
    }
  });
}