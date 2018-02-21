/**
 * function getMiddleIndex
 *
 * Функция принимает в качестве аргумента массив чисел, находит индекс элемента, сумма до которого, максимально
 * приближена к сумме после которого. Поидее находит среднюю линию.
 *
 * @param {[number]} array_number - массив чисел.
 * @returns {number} - индекс элемента, по которому можно провести среднюю линию.
 */
function getMiddleIndex(array_number) {

    var sum = getSum(array_number);
    var sum_left = 0.0;
    var sum_right = sum;

    var module = sum;
    var index = -1;

    for (var i = 0; i < array_number.length; i++){

        sum_left += array_number[i];
        sum_right = sum - sum_left;

        var module_ = Math.abs(sum_right - sum_left);
        if(module_ < module) {
            module = module_;
            index = i;
        }
    }
    return index;
}

/**
 * function getSum
 *
 * Функция принимает массив чисел, возвращает сумму модулей данных чисел.
 *
 * @param {[number]} array_number - массив чисел.
 * @returns {number} - сумма модулей данных чисел.
 */
function getSum(array_number) {

    var sum = 0.0;

    for(var i = 0; i < array_number.length; i++){

        sum += Math.abs(array_number[i]);

    }

    return sum;

}

/**
 * function isTrueSymbols
 *
 * Проверяет все символы строки на соответствие требованиям ввода.
 *
 * @param {string} str - строка.
 * @returns {boolean} - true, если имеются только числа, пробелы, точки; false, иначе.
 */
function isTrueSymbols(str){

    for(var i = 0; i < str.length; i++){
        if (!isTrueSymbol(str.charAt(i))){
            return false;
        }
    }
    return true;
}

/**
 * function isTrueSymbol
 *
 * Проверяет символ на соответствие требованиям ввода.
 *
 * @param {string} str - строка.
 * @returns {boolean} - true, если это число, точка или пробел; false, иначе.
 */
function isTrueSymbol(str) {
    return isNumeric(str) || isPoint(str) || isSpace(str);
}

/**
 * function isNumeric
 *
 * Функция проверяет является ли символ цифрой "1", "2", "3", "4", "5", "6", "7", "8", "9", "0".
 *
 * @param {string} str - символ.
 * @returns {boolean} - true, если является "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"; false, иначе.
 */
function isNumeric(str) {
    if (str === "1") return true;
    if (str === "2") return true;
    if (str === "3") return true;
    if (str === "4") return true;
    if (str === "5") return true;
    if (str === "6") return true;
    if (str === "7") return true;
    if (str === "8") return true;
    if (str === "9") return true;
    if (str === "0") return true;
    return false;
}

/**
 * function isPoint
 *
 * Функция проверяет, является ли символ точкой ".".
 *
 * @param {string} str - строка.
 * @returns {boolean} - true, если "."; false, иначе.
 */
function isPoint(str) {
    return str === ".";
}

/**
 * function isSpace
 *
 * Функция проверяет, является ли символ пробелом " ".
 * @param {string} str - символ.
 * @returns {boolean} - true, если " "; false, иначе.
 */
function isSpace(str) {
    return str === " ";
}

/**
 * function isRepeatSymbol
 *
 * Функция проверяет есть ли повторяющиеся символы указанные в массиве в переданной строке.
 *
 * @param {string} str - строка.
 * @param {[string]} array_symbol - массив символов для проверки.
 * @returns {boolean} - true, если ни один символ из массива не повторяется; false, иначе.
 */
function isRepeatSymbol(str, array_symbol){

    var symbol = str.charAt(0);

    for (var i = 1; i < str.length; i++) {

        var char = str.charAt(i);

        for(var s = 0; s < array_symbol.length; s++) {
            if (symbol === array_symbol[s] && char === array_symbol[s]) {
                return true;
            }
        }
        symbol = char;
    }
    return false;
}

/**
 * function isErrorNumber
 *
 * Функция проверяет, есть ли ошибки в массиве чисел, в записи самих чисел, в числе не должны повторяться точки.
 *
 * @param {string} str - строка чисел.
 * @returns {boolean} - true, если ошибки присутствуют; false, иначе.
 */
function isErrorNumber(str) {

    var flag_number = false;
    var flag_point = 0;

    for(var i = 0; i < str.length; i++){

        var char = str.charAt(i);
        if(isSpace(char)){
            flag_number = false;
            flag_point = 0;
        }

        if(isNumeric(char)){
            flag_number = true;
        }

        if(isPoint(char)){
            flag_point++;
        }

        if(flag_number && flag_point > 1){
            return true;
        }
    }
    return false;
}

/**
 * function removeRepeatSymbols
 *
 * Удаляет все повторяющиеся элементы в строке, которые имеются в переданном массиве.
 *
 * @param {string} str - строка.
 * @param {[string]} array_symbol - массив символов
 * @returns {string} - строка с удаленными символами повторяющимися.
 */
function removeRepeatSymbols(str, array_symbol) {

    var symbol = str.charAt(0);

    for (var i = 1; i < str.length; i++) {

        var char = str.charAt(i);

        for(var s = 0; s < array_symbol.length; s++) {
            if (symbol === array_symbol[s] && char === array_symbol[s]) {
                str = str.substring(0, i) + str.substring(i + 1);
                i--;
                symbol = str.charAt(i);
                continue;
            }
        }

        symbol = char;
    }
    return str;
}
