/**
 * function onClickCell
 *
 * Слушатель клика по полю ввода для ячеек таблицы с числами.
 */
function onClickCell() {
    upDate();
}

/**
 * function onKeyUpCell
 *
 * Слушатель отпуска клавиши на поле ввода для ячеек таблицы с числами.
 */
function onKeyUpCell() {
    upDate();
}

/**
 * function onClickButtonRandom
 *
 * Слушатель нажатия по кнопке рандомной генерации чисел.
 */
function onClickButtonRandom() {
    generationRandomValuesTable();
    upDate();
}

/**
 * function onClickSetZeroAllCells
 *
 * Слушатель нажатия по кнопке установки везде нулей.
 */
function onClickSetZeroAllCells() {
    setValueAllCells(0);
    upDate();
}
