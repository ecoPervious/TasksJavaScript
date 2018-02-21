/**
 * function upDate
 *
 * Функция обновляет GUI.
 */
function upDate() {

    setBackgroundColorAllCell("white");
    var max = getMaxValueFromCells();
    var res = setBackgroundColorCellValue(max, "green");
    setOutputIdCellMaxValue(res);
}

/**
 * function setBackgroundColorCellValue
 *
 * Функция принимает значение и название цвета. Все ячейки с данным значением закрашивает в данный цвет.
 * Формирует строку с координатами закрашенных ячеек.
 *
 * @param {int} value - значение.
 * @param {string} color - название цвета.
 * @returns {string} - список координат закрашенных ячеек.
 */
function setBackgroundColorCellValue(value, color){

    var string = "";
    for(var tr = 0; tr < 10; tr++){
        for(var td = 0; td < 10; td++){
            var id = getId(tr, td);
            if (getValueCell(id)===value){
                setBackgroundColorCell(id, color);
                string += "(" + td + ";" + tr + ") = " + value + "<br>";
            }
        }
    }
    return string;
}

/**
 * function setBackgroundColorAllCell
 *
 * Функция устанавливает на все ячейки входной цвет.
 *
 * @param {string} color - название цвета.
 */
function setBackgroundColorAllCell(color) {

    for(var tr = 0; tr < 10; tr++){
        for(var td = 0; td < 10; td++){
            setBackgroundColorCell(getId(tr, td),color);
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
 * function setOutputIdCellMaxValue
 *
 * Функция устанавливает значение для параграфа предназначенного для вывода координат закрашенных ячеек, то есть с
 * максимальным значением.
 *
 * @param {string} str - строка с списком координат.
 */
function setOutputIdCellMaxValue(str) {
    document.getElementById("id_cell_max_value").innerHTML = str;
}

/**
 * function setValueAllCells
 *
 * Функция устанавилвает всем ячейкам значение value.
 *
 * @param {number|string|*} value - значение.
 */
function setValueAllCells(value) {
    for(var tr = 0; tr < 10; tr++){
        for(var td = 0; td < 10; td++){
            setValueCell(getId(tr, td), value);
        }
    }
}

/**
 * function generationTable
 *
 * Генерирует строку с HTML кодом в виде внутренностей для таблицы с id="main_table" и устанавливает.
 * В процессе генерации получается таблица 10 на 10, в каждой ячейки поле для ввода чисел.
 */
function generationTable() {

    var result = "";
    for (var i = 0; i < 10; i++) {
        result += "<tr>" + generationTableString(i) + "</tr>";
    }
    document.getElementById("main_table").innerHTML = result;
}

/**
 * function generationTableString
 *
 * Функция генерирует внутренности для строчки таблицы и возвращает строку с HTML кодом.
 *
 * @param {int|string} tr - номер строки, используется для генерации id для полей ввода в ячейках.
 * @returns {string} - строка с HTML кодом.
 */
function generationTableString(tr) {

    var result = "";

    for (var i = 0; i < 10; i++) {

        result += "<td>" +
            "<input " +
            "class='cell' " +
            "id='" + getId(tr, i) + "' " +
            "type='number' " +
            "onclick='onClickCell()' " +
            "onkeyup='onKeyUpCell()'/></td>";

    }

    return result;

}

/**
 * function generationRandomValuesTable
 *
 * Функция генерирует рандомные значения для ячеек таблицы и устанавливает их.
 */
function generationRandomValuesTable() {

    for(var tr = 0; tr < 10; tr++){
        for(var td = 0; td < 10; td++){
            setValueCell(getId(tr,td), randomInteger(getValueMinRandom(),getValueMaxRandom()));
        }
    }
}

/**
 * function getMaxValueFromCells
 *
 * Функция находит максимальное значение в таблице и возвращает его.
 *
 * @return {int} - максимальное значение в таблице.
 */
function getMaxValueFromCells(){

    var maxValue = getValueCell(getId(0, 0));

    for (var tr = 0; tr < 10; tr++){
        for (var td = 0;td < 10; td++){
            var v = getValueCell(getId(tr, td));
            if (v > maxValue){
                maxValue = v;
            }
        }
    }
    return maxValue;
}

/**
 * function getValueMinRandom
 *
 * @return {int} - минимальное значение чисел при генерации рандомных значений для таблицы.
 */
function getValueMinRandom() {
    return getValueInteger("min_random");
}

/**
 * function getValueMaxRandom
 *
 * @return {int} - максимальное значение чисел при генерации рандомных значений для таблицы.
 */
function getValueMaxRandom() {
    return getValueInteger("max_random");
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
 * function getValueInteger
 *
 * @param {string} id - id поля.
 * @return {int} - значение поля.
 */
function getValueInteger(id) {
    var i = parseInt(document.getElementById(id).value);
    if(isNaN(i)){
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
function getId(tr, td) {
    return "TR_" + tr + "TD" + td;
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
function randomInteger(min, max) {
    var rand = min + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
}
