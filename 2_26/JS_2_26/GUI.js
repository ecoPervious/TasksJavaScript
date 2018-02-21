/**
 * function upDateOutput
 *
 * Функция обновляет GUI.
 */
function upDateOutput() {

    var mathematical_expression = getInput();
    if (!isTrueString(mathematical_expression)) {
        setOutput("Неразрешенные символы, ошибка ввода!");
    } else if (isNotSingleDigitNumbers(mathematical_expression)) {
        setOutput("Не одноразрядные числа!");
    } else if (isErrorParentheses(mathematical_expression)) {
        setOutput("Неправильная расстановка скобок!");
    } else {
        var i = isRepeatMathSign(mathematical_expression);
        if (i === -1) {
            setOutput("Повторяющиеся знаки или недопустимо расставленные!")
        } else if (i > 0) {
            mathematical_expression = removeRepeatMathSign(mathematical_expression);
            setOutput(getPostfixForm(mathematical_expression));
        } else {
            setOutput(getPostfixForm(mathematical_expression));
        }
    }

}

/**
 * function getInput
 *
 * Возвращает введенную информацию.
 *
 * @returns {string|Number|*|string} - value из поля для ввода c id="in".
 */
function getInput() {
    return document.getElementById("in").value;
}

/**
 * function setOutput
 *
 * Устанавливает переданную строку, как значение в поле для ввода с id="out".
 *
 * @returns {string|Number|*|string} - value из поля для ввода c id="out".
 */
function setOutput(str) {
    document.getElementById("out").value = str;
}

/**
 * function println
 *
 * Функция устарела(использовалась в процессе тестирования). Выводит информацию на экран.
 *
 * @param {string} str - строка с информацией для вывода.
 */
function println(str) {
    document.getElementById("console").innerHTML += str + "<br/>";
}
