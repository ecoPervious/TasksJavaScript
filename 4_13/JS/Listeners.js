/**
 * function onClickGenerationRandom
 *
 * Слушатель на нажатие для кнопки генерации рандомных значений в таблице.
 */
function onClickGenerationRandom(id) {
    generationRandomValuesTable();
    upDateTableValueColorMax();
}

/**
 * function onClickSetZeroAllCells
 *
 * Слушатель на нажатие по кнопки установки нулей во все ячейки таблицы.
 */
function onClickSetZeroAllCells() {
    setValueAllCells(0);
    setBackgroundColorAllCell("white");
    setInputSum(0);
}

/**
 * function onClickCheckBox
 *
 * Слушать на нажатие по CheckBox.
 */
function onClickCheckBox() {
    setIsAddRepeatMaxValue(getIsAddRepeatMaxValue());
    upDateTableValueColorMax();
}

/**
 * function onClickGenerationTable
 *
 * Слушатель на нажатие по кнопке генерации таблицы.
 */
function onClickGenerationTable() {
    generationTable(getValueInputM(),getValueInputN());
    setValueAllCells(0);
}

/**
 * function onKeyUpCell
 *
 * Слушатель на отпуск клавиши в поле для ввода внутри ячеек.
 */
function onKeyUpCell(id){
    upDateTableValueColorMax();
}

/**
 * function onKeyUpRandMin
 *
 * Слушатель на отпуск клавиши в поле ввода минимального значения рандомного числа.
 */
function onKeyUpRandMin() {
    if(getValueMinRandom()==="NaN"){
        setBackgroundColorById("min_random","red");
    }else{
        setBackgroundColorById("min_random","green");
    }
}

/**
 * function onKeyUpRandMax
 *
 * Слушатель на отпуск клавиши в поле ввода максимального значения рандомного числа.
 */
function onKeyUpRandMax() {
    if(getValueMaxRandom()==="NaN"){
        setBackgroundColorById("max_random","red");
    }else{
        setBackgroundColorById("max_random","green");
    }
}
