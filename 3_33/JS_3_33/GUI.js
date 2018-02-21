/**
 * function upDateOut
 *
 * Функция обновления GUI.
 */
function upDateOut() {



    var flag_error = false; // Флаг для ошибок
    var str_a = getInputA(); // Строка из поля ввода для массива A
    var str_b = getInputB(); // Строка из поля ввода для массива B

    /*
    Убираем лишние пробелы на концах строк
     */
    str_a = str_a.trim();
    str_b = str_b.trim();

    /*
    Проверяем обе строки на неразрешенные символы
     */
    if(!isAllowedLetters(str_a)){
        setOutputA("Введены неразрешенные символы!", false);
        flag_error = true;
    }else {
        setOutputA("С этим массивом всё впорядке :): ", true);
    }

    if(!isAllowedLetters(str_b)){
        setOutputB("Введены неразрешенные символы!", false);
        flag_error = true;
    }else {
        setOutputB("С этим массивом всё впорядке :): ", true);
    }

    /*
    Если была обнаруженна ошибка, пишем сообщение в основное поле вывода, а флаг ставим равным false
     */
    if(flag_error){
        setOutput("Исправьте ошибки!", false);
        flag_error = false;
        return;
    }

    /*
    Удаляем лишние пробелы между числами, если они имеются
     */
    str_a = removeRepeatSpace(str_a);
    str_b = removeRepeatSpace(str_b);

    /*
    Разбиваем строку на элементы
     */
    var array_a = getArrayInt(str_a);
    var array_b = getArrayInt(str_b);

    /*
    Если массивы пустые, то пишем соответствующее сообщение
     */
    if(array_a.length === 1 && str_a === ""){
        setOutputA("Массив пуст", true);
        flag_error = true;
    }

    if(array_b.length === 1 && str_b === ""){
        setOutputB("Массив пуст", true);
        flag_error = true;
    }

    /*
    Если в процессе проверки на пустоту было обнаруженно то, что хотя бы один из массивов пустой
    пишем соответствующее сообщение в основное поле вывода.
     */
    if(flag_error){
        setOutput("Введите числа пожалуйста :) ", true);
        return;
    }

    /*
    Если количество элементов массивов разное, то пишем соответствующее предупреждение.
     */
    if(array_a.length !== array_b.length){
        setOutput("В массивах разное количество элементов, исправьте пожалуйста :) ", true);
        return;
    }

    /*
    Проверяем одинаковые ли перед нами массивы, пишем соответствующе сообщение в виде основного ответа.
     */
    if(isEqual(array_a, array_b)){
        setOutput("<<Да>> массивы состоят из одних и тех же элементов. ", true);
    }else {
        setOutput("<<Нет>> массивы не состоят из одних и тех же элементов. ", true);
    }
}

/**
 * function getArrayIn
 *
 * Функция разбивает строку на части по пробелу, превращает все элементы в целочисленные значения,
 * возвращает массив.
 *
 * @param {string} str - строки чисел.
 * @returns {[int]} - целочисленный массив.
 */
function getArrayInt(str) {
    var array = str.split(" ");

    for(var i = 0; i < array.length; i++){
        array[i] = parseInt(array[i]);
    }
    return array;
}

/**
 * function isEqual
 *
 * Функция принимает два массива, в случае их полного равенства, возвращает true, иначе false.
 *
 * @param {[int]} arrayA - массив A.
 * @param {[int]} arrayB - массив B.
 * @returns {boolean} - true, если массивы состоят из одинаковых элементов; false, иначе.
 */
function isEqual(arrayA, arrayB) {

    var map = {};

    for (var i = 0; i < arrayA.length; i++){

        if (typeof map[arrayA[i]] === "undefined"){
            map[arrayA[i]] = 1;
        }else {
            map[arrayA[i]]++;
        }

    }

    for(var i = 0; i < arrayB.length; i++){

        if(typeof map[arrayB[i]] === "undefined"){
            return false;
        }else{
            map[arrayB[i]]--;
            if(map[arrayB[i]] === 0){
                delete map[arrayB[i]];
            }
        }

    }

    return true;

}

/**
 * function getInputA
 *
 * Возвращает введенную информацию в поле для ввода с id="in_a".
 *
 * @returns {string|Number|*|string} - value из поля для ввода c id="in_a".
 */
function getInputA() {
    return document.getElementById("in_a").value;
}

/**
 * function getInputB
 *
 * Возвращает введенную информацию в поле для ввода с id="in_a".
 *
 * @returns {string|Number|*|string} - value из поля для ввода c id="in_b".
 */
function getInputB() {
    return document.getElementById("in_b").value;
}

/**
 * function setOutputA
 *
 * Функция устанавливает в поле для вывода информации с id="out_a" строку и в зависимости от переданного значения
 * параметра bool устанавливает цвет текста.
 *
 * @param {string} str - строка вывода.
 * @param {boolean} bool - true, зеленый цвет текста; false, красный.
 */
function setOutputA(str, bool) {
    document.getElementById("out_a").value = str;
    document.getElementById("out_a").style.color = bool ? "green" : "red";
}

/**
 * function setOutputB
 *
 * Функция устанавливает в поле для вывода информации с id="out_b" строку и в зависимости от переданного значения
 * параметра bool устанавливает цвет текста.
 *
 * @param {string} str - строка вывода.
 * @param {boolean} bool - true, зеленый цвет текста; false, красный.
 */
function setOutputB(str, bool) {
    document.getElementById("out_b").value = str;
    document.getElementById("out_b").style.color = bool ? "green" : "red";
}

/**
 * function setOutput
 *
 * Функция устанавливает в поле для вывода информации с id="out" строку и в зависимости от переданного значения
 * параметра bool устанавливает цвет текста.
 *
 * @param {string} str - строка вывода.
 * @param {boolean} bool - true, зеленый цвет текста; false, красный.
 */
function setOutput(str, bool) {
    document.getElementById("out").value = str;
    document.getElementById("out").style.color = bool ? "green" : "red";
}

/**
 * function isAllowedLetters
 *
 * Функция проверяет, разрешены ли все символы переданной строки.
 *
 * @param {string} str - строка.
 * @returns {boolean} - true, если все символы разрешены; false, иначе.
 */
function isAllowedLetters(str) {

    for (var i = 0; i < str.length; i++) {
        if (!isAllowedLetter(str.charAt(i))) {
            return false;
        }
    }
    return true;
}

/**
 * function isAllowedLetter
 *
 * Функция проверяет разрешен ли входной символ.
 *
 * @param {string} letter - символ.
 * @returns {boolean} - true, если символ разрешен; false, иначе.
 */
function isAllowedLetter(letter) {
    return isNumeric(letter) || isSpace(letter);
}

/**
 * function isNumeric
 *
 * Функция проверяет является ли символ цифрой "1", "2", "3", "4", "5", "6", "7", "8", "9", "0".
 *
 * @param {string} str - символ.
 * @returns {boolean} - true, если является "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"; false, иначе.
 */
function isNumeric(letter) {
    if (letter === "1") return true;
    if (letter === "2") return true;
    if (letter === "3") return true;
    if (letter === "4") return true;
    if (letter === "5") return true;
    if (letter === "6") return true;
    if (letter === "7") return true;
    if (letter === "8") return true;
    if (letter === "9") return true;
    if (letter === "0") return true;
    return false;
}

/**
 * function isSpace
 *
 * Функция проверяет, является ли символ пробелом " ".
 * @param {string} str - символ.
 * @returns {boolean} - true, если " "; false, иначе.
 */
function isSpace(letter) {
    return letter === " ";
}

/**
 * function removeRepeatSpace
 *
 * Функция удаляет из строки повторяющиеся пробелы. Удаляются лишние пробелы,
 * то есть два и более пробелов становятся одним пробелом.
 *
 * @param {string} str - строка.
 * @returns {string} - строка без повторяющихся пробелов.
 */
function removeRepeatSpace(str) {

    var symbol = str.charAt(0);
    for (var i = 1; i < str.length; i++) {

        var char = str.charAt(i);

        if (symbol === " " && char === " ") {
            str = str.substring(0, i) + str.substring(i + 1);
            i--;
            symbol = str.charAt(i);
            continue;
        }
        symbol = char;
    }
    return str;
}


