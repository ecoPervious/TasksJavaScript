/**
 * function upDateTableValueColorMax
 *
 * Функция находит максимальные значения внутри тыблицы, обновляет раскраску таблицы.
 */
function upDateTableValueColorMax() {

    setBackgroundColorAllCell("white")
    setInputSum(getResult());

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
                "onkeyup='onKeyUpCell(this.id)'" +
                "step='0.1'/>" +
                "</td>";

        }

        result += "</tr>";

    }

    document.getElementById("main_table").innerHTML = result;

    setValueM(myM);
    setValueN(myN);
}

/**
 * function generationRandomFloat
 *
 * Функция рандомно генерирует число от min до max. Об особенностях генерации:
 * генерируется вещественное число, при этом округление происходит до 0,01.
 *
 * @param {int|float} min - минимальное значение рандомно сгенерированного числа.
 * @param {int|float} max - максимальное значение рандомно сгенерированного числа.
 * @return {float} - рандомное число.
 */
function generationRandomFloat(min, max) {
    var rand = min + Math.random() * (max - min)
    rand = Math.round(rand / 0.01) * 0.01;
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
            setValueCell(getIdCell(tr, td), generationRandomFloat(getValueMinRandom(), getValueMaxRandom()));
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

/**
 * function getResult
 *
 * Функция находит в каждой строчке таблицы максимальное значение, после чего закрашивает все ячейки с максимальным
 * значением для определенной строчки. Если в строке имеется несколько значений с максимальным значением,
 * то закрашивает все.
 *
 * В случае, если в ячейке некорректно введено число и из значения в ячейки невозможно получить float, ячейка
 * окрашивается в красный цвет.
 *
 * Сумма максимальных ячеек строчек суммируется и возвращается. Если в ячейки несколько максимальных значений, то
 * суммируется все из них.
 *
 * @return {number} - сумма максимальных значений.
 */
function getResult() {

    var m = getValueM(); // Количество строк
    var n = getValueN(); // Количество столбцов

    var array_max = []; // Массив с максимальными элементами каждой строки

    for (var myM = 0; myM < m; myM++) {

        var max = "NaN"; // Максимальное значение внутри строки с номером "myM"

        /*
            Цикл нахождения максимального элемента внутри строки с номером "myM";
         */
        for (var myN = 0; myN < n; myN++) {

            var id = getIdCell(myM, myN);
            var value = getValueCell(id);

            if (value === "NaN") {
                setBackgroundColorById(id, "red");
                continue;
            } else {
                setBackgroundColorById(id, "white");
            }

            if (value > max || max === "NaN") {
                max = value;
                count = 1;
            } else if (value === max) {
                count++;
            }
        }

        setBackgroundColorCellValueInString(myM, max, "green"); // Установка цвета на ячейки с максимальными элементами

        array_max[myM] = max; // Запись в массив максимального значения строки "myM"
    }

    var result = 0.0; // Результат
    var end_i = array_max.length % 2 === 0 ? array_max.length / 2 : (array_max.length + 1) / 2;
    /*
        В следующем цикле мы находим значение выражения X1 * Xn-1 + X2 * Xn-2 ... Xn-1 * X2 + Xn * X1, как видно
        из записи, первое и последние, второе и предпоследние слогаемое равны между собой, что бы эти одинаковые
        произведения не считать дважды, мы считаем его один раз и умножаем на 2, что сокращает цикл в два раза.
     */
    for (var i = 0; i < end_i; i++) {
        result += 2 * (array_max[i] * array_max[array_max.length - 1 - i]);
    }

    return result;
}

/**
 * function setBackgroundColorCellValueInString
 *
 * Функция закрашивает все ячейки строки под номером myM, которые содержат значение value в цвет color.
 *
 * @param {int} myM - номер строки
 * @param {float} value - значение
 * @param {string} color - название цвета.
 */
function setBackgroundColorCellValueInString(myM, value, color) {

    var n = getValueN();
    for (var myN = 0; myN < n; myN++) {
        var id = getIdCell(myM, myN);
        var v = getValueCell(id);
        if (v === value) {
            setBackgroundColorById(id, color);
        }
    }
}

/**
 * function setBackgroundColorById
 *
 * Функция устанавливает backgroundColor для элемента с переданным id.
 *
 * @param {string} id - id элемента.
 * @param {string} color - название цвета.
 */
function setBackgroundColorById(id, color) {
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

    for (var tr = 0; tr < m; tr++) {
        for (var td = 0; td < n; td++) {
            setBackgroundColorById(getIdCell(tr, td), color);
        }
    }
}

/**
 * function setInputSum
 *
 * Функция устанавливает значение в ячейку для вывода суммы максимальных значений.
 *
 * @param {string|number|int|float} str - строка или число.
 */
function setInputSum(str) {
    document.getElementById("result").value = str;
}

/**
 * function setValueM
 *
 * Функция устанавливает значение глобальной переменной хараткризующей размерность таблицы M.
 *
 * @param {int} m - значение M.
 */
function setValueM(m) {
    window.sizeM = m;
}

/**
 * function setValueN
 *
 * Функция устанавливает значение глобальной переменной хараткризующей размерность таблицы N.
 *
 * @param {int} n - значение N.
 */
function setValueN(n) {
    window.sizeN = n;
}

/**
 * function getValueM
 *
 * Функция возвращает значение глобальной переменной sizeM.
 *
 * @return {int} - значение sizeM.
 */
function getValueM() {
    return window.sizeM;
}

/**
 * function getValueN
 *
 * Функция возвращает значение глобальной переменной sizeN.
 *
 * @return {int} - значение sizeN.
 */
function getValueN() {
    return window.sizeN;
}

/**
 * function getValueMinRandom
 *
 * @return {int} - минимальное значение чисел при генерации рандомных значений для таблицы.
 */
function getValueMinRandom() {
    return getValueInputFloat("min_random");
}

/**
 * function getValueMaxRandom
 *
 * @return {int} - максимальное значение чисел при генерации рандомных значений для таблицы.
 */
function getValueMaxRandom() {
    return getValueInputFloat("max_random");
}

/**
 * function getValueInputFloat
 *
 * Функция парсит значение поля с id, пытаясь обнаружить там вещественное значение и возвращает его. Если значение
 * не обнаруженно, то вернется "NaN".
 *
 * @param {string} id - id поля.
 * @return {float} - значение поля.
 */
function getValueInputFloat(id) {
    var i = parseFloat(document.getElementById(id).value);
    if (isNaN(i)) {
        return "NaN";
    }
    return i;
}

/**
 * function getValueInputM
 *
 * Функция возвращает значение, которое установлено в поле с id="size_m". Важно понять, что данный метод отличается
 * от getValueM тем, что возвращает текущее значение поля GUI, а не значение глобальной переменной. Различие данных
 * двух методов позволяет избежать ситуации, когда пользователь сгенерировал таблицу, ввёл данные, изменил значение
 * в полях и решил посчитать сумму максимальных элементов. Вполне понятно, что если брать значение сразу из поля, то
 * можно наткнуться на несоответствие значения и реальной таблицы.
 *
 * @return {Number} - значение переменной.
 */
function getValueInputM() {
    return getValueInputInteger("size_m");
}

/**
 * function getValueInputN
 *
 * Функция возвращает значение, которое установлено в поле с id="size_n". Важно понять, что данный метод отличается
 * от getValueN тем, что возвращает текущее значение поля GUI, а не значение глобальной переменной. Различие данных
 * двух методов позволяет избежать ситуации, когда пользователь сгенерировал таблицу, ввёл данные, изменил значение
 * в полях и решил посчитать сумму максимальных элементов. Вполне понятно, что если брать значение сразу из поля, то
 * можно наткнуться на несоответствие значения и реальной таблицы.
 *
 * @return {Number} - значение переменной.
 */
function getValueInputN() {
    return getValueInputInteger("size_n");
}

/**
 * function getValueCell
 *
 * @param {string} id - id ячейки таблицы.
 * @return {int} - значение ячейки таблицы.
 */
function getValueCell(id) {
    return getValueInputFloat(id);
}

/**
 * function getValueInputInteger
 *
 * Функция парсит значение поля с id, пытаясь обнаружить там целочисленное значение и возвращает его. Если значение
 * не обнаруженно, то вернутся ноль.
 *
 * @param {string} id - id поля.
 * @return {int} - значение поля.
 */
function getValueInputInteger(id) {
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
