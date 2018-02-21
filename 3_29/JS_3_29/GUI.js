/**
 * function upDateGUI
 *
 * Функция обновляет GUI.
 */
function upDateGUI() {

    var input = getInput();
    input = input.trim();

    if (!isTrueSymbols(input)){
        setOutput("Введены неразрешенные символы!");
        return false;
    } else if (isErrorNumber(input)){
        setOutput("Некорректный ввод числа!");
        return false;
    } else if (isRepeatSymbol(input, [" ", "."])){
        input = removeRepeatSymbols(input, [" ", "."]);
    }

    var array = input.split(" ");

    if(array.length <= 1){
        setOutput("Введите более одного элемента.");
        return false;
    }

    for (var i = 0; i < array.length; i++){

        var char = array[i];
        array[i] = parseFloat(char);

    }
    setOutput(getMiddleIndex(array));
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
 * function getInput
 *
 * Возвращает введенную информацию.
 *
 * @returns {string|Number|*|string} - value из поля для ввода c id="in".
 */
function getInput() {
    return document.getElementById("in").value;
}