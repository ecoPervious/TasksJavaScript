function upDateTableValueColorMax() {

    setBackgroundColorAllCell("white")
    var bool = isAddRepeatMaxValue();
    setInputSum(getSumMaxValueInStrings(bool));

}

/**
 * function generationTable
 *
 * Генерирует строку с HTML кодом в виде внутренностей для таблицы с id="main_table" и устанавливает.
 * В процессе генерации получается таблица myM на myN, в каждой ячейки поле для ввода чисел.
 *
 * @param myM - размер матрицы M
 * @param myN - размер матрицы N
 */
function generationTable(myM, myN) {

    var result = "";

    for (var m = 0; m < myM; m++) {
        result += "<tr>";

        for (var n = 0; n < myN; n++) {

            result += "<td>" +
                "<input " +
                "class='cell' " +
                "id='" + getIdCell(m, n) + "' " +
                "type='number' " +
                "onkeyup='onKeyUpCell()'/></td>";

        }

        result += "</tr>";

    }

    document.getElementById("main_table").innerHTML = result;

    setValueM(myM);
    setValueN(myN);
}

/**
 * function randomInteger
 *
 * Функция рандомно генерирует число от min до max.
 *
 * @param {int} min - минимальное значение рандомно сгенерированного числа.
 * @param {int} max - максимальное значение рандомно сгенерированного числа.
 * @return {int} - рандомное число.
 */
function generationRandomInteger(min, max) {
    var rand = min + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
}

/**
 * function generationRandomValuesTable
 *
 * Функция генерирует рандомные значения для ячеек таблицы и устанавливает их.
 */
function generationRandomValuesTable() {

    var m = getValueM();
    var n = getValueN();

    for (var tr = 0; tr < m; tr++) {
        for (var td = 0; td < n; td++) {
            setValueCell(getIdCell(tr, td), generationRandomInteger(getValueMinRandom(), getValueMaxRandom()));
        }
    }
}

/**
 * function setValueCell
 *
 * Функция устанавливает значение="value" ячейки с id="id".
 *
 * @param {string} id - id ячейки.
 * @param {number|string|*} value - значение
 */
function setValueCell(id, value) {
    document.getElementById(id).value = value;
}

/**
 * function setValueAllCells
 *
 * Функция устанавилвает всем ячейкам значение value.
 *
 * @param {number|string|*} value - значение.
 */
function setValueAllCells(value) {

    var m = getValueM();
    var n = getValueN();

    for (var tr = 0; tr < m; tr++) {
        for (var td = 0; td < n; td++) {
            setValueCell(getIdCell(tr, td), value);
        }
    }
}

function getSumMaxValueInStrings(is_sum_repeat) {

    if(is_sum_repeat){
        return getSumMaxValueInStringsTrueRepeat();
    }else{
        return getSumMaxValueInStringsFalseRepeat();
    }

}

function getSumMaxValueInStringsFalseRepeat() {

    var m = getValueM();
    var n = getValueN();

    var sum = 0;

    for (var myM = 0; myM < m; myM++) {

        var max = 0;

        if (1 < n) {
            max = getValueInputNumber(getIdCell(myM, 0))
        }
        for (var myN = 0; myN < n; myN++) {

            var value = getValueInputNumber(getIdCell(myM, myN));
            if (value > max){
                max = value;
            }
        }
        setBackgroundColorCellValueInString(myM, max, "green");
        sum += max;
    }
    return sum;
}

function getSumMaxValueInStringsTrueRepeat() {

    var m = getValueM();
    var n = getValueN();

    var sum = 0;

    for (var myM = 0; myM < m; myM++) {

        var max = 0;
        var count = 0;

        if (1 < n) {
            max = getValueInputNumber(getIdCell(myM, 0))
        }
        for (var myN = 0; myN < n; myN++) {

            var value = getValueInputNumber(getIdCell(myM, myN));
            if (value > max){
                max = value;
                count = 1;
            }else if(value === max){
                count++;
            }
        }
        setBackgroundColorCellValueInString(myM, max, "green");
        sum += (max * count);
    }
    return sum;
}

function setBackgroundColorCellValueInString(myM, value, color) {

    var n = getValueN();
    for(var myN = 0; myN < n; myN++){
        var id = getIdCell(myM, myN);
        var v = getValueInputNumber(id);
        if(v === value){
            setBackgroundColorCell(id, color);
        }
    }
}

/**
 * function setBackgroundColorCell
 *
 * Функция закрашивает ячейку с id="id" в цвет="color".
 *
 * @param {string} id - id ячейки.
 * @param {string} color - название цвета.
 */
function setBackgroundColorCell(id, color) {
    document.getElementById(id).style.backgroundColor = color;
}

/**
 * function setBackgroundColorAllCell
 *
 * Функция устанавливает на все ячейки входной цвет.
 *
 * @param {string} color - название цвета.
 */
function setBackgroundColorAllCell(color) {

    var m = getValueM();
    var n = getValueN();

    for(var tr = 0; tr < m; tr++){
        for(var td = 0; td < n; td++){
            setBackgroundColorCell(getIdCell(tr, td),color);
        }
    }
}

function setInputSum(str) {
    document.getElementById("result").value = str;
}

/**
 * function getValueMinRandom
 *
 * @return {int} - минимальное значение чисел при генерации рандомных значений для таблицы.
 */
function getValueMinRandom() {
    return getValueInputNumber("min_random");
}

/**
 * function getValueMaxRandom
 *
 * @return {int} - максимальное значение чисел при генерации рандомных значений для таблицы.
 */
function getValueMaxRandom() {
    return getValueInputNumber("max_random");
}

function setValueM(m) {
    window.sizeM = m;
}

function setValueN(n) {
    window.sizeN = n;
}

function setIsAddRepeatMaxValue(bool) {
    window.isAddDublicatesMaxValue = bool;
}

function getValueM() {
    return window.sizeM;
}

function getValueN() {
    return window.sizeN;
}

function isAddRepeatMaxValue() {
    return window.isAddDublicatesMaxValue;
}

function getIsAddRepeatMaxValue() {
    if (document.getElementById("checkbox").checked == true) {
        return true;
    } else {
        return false;
    }
}

function getValueInputM() {
    return getValueInputNumber("size_m");
}

function getValueInputN() {
    return getValueInputNumber("size_n");
}

/**
 * function getValueCell
 *
 * @param {string} id - id ячейки таблицы.
 * @return {int} - значение ячейки таблицы.
 */
function getValueCell(id) {
    return getValueInteger(id);
}

/**
 * function getValueInputNumber
 *
 * @param {string} id - id поля.
 * @return {int} - значение поля.
 */
function getValueInputNumber(id) {
    var i = parseInt(document.getElementById(id).value);
    if (isNaN(i)) {
        i = 0;
    }
    return i;
}

/**
 * function getId
 *
 * Генерирует строковый ID относительно номера строки и стобца, для ячеек таблицы.
 *
 * @param {int} tr - номер строки.
 * @param {int} td - номер столбца.
 * @return {string} - строковый ID.
 */
function getIdCell(tr, td) {
    return "TR_" + tr + "TD" + td;
}
