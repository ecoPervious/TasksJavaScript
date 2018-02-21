/**
 * function upDateResult
 *
 * Читает данные с полей несущих в себе значения дроби и знака, вычисляет результат, устанавливает его в поля.
 *
 */
function upDateResult() {

    var denominator_a = getValue("denominator_a");
    var denominator_b = getValue("denominator_b");

    if (denominator_a == 0 || denominator_b == 0) {

        document.getElementById("numerator_r").value = " ";
        document.getElementById("denominator_r").value = " ";
        return null;

    }

    denominator_a = parseInt(denominator_a);
    denominator_b = parseInt(denominator_b);

    var sign = getSign();

    var FNA = new FractionalNumber(parseInt(getValue("numerator_a")), denominator_a);
    var FNB = new FractionalNumber(parseInt(getValue("numerator_b")), denominator_b);

    if (sign) {
        FNA.addFN(FNB);
    } else {
        FNA.subFN(FNB);
    }

    setResult(FNA.numerator, FNA.denominator, FNA.getSign());

}

/**
 * function setResult
 *
 * Принимает значения и устанавливает их в поля, которые отображают результат. *
 *
 * @param numerator - числитель дроби.
 * @param denominator - знаменатель дроби.
 * @param sign - знак.
 */
function setResult(numerator, denominator, sign) {

    if (numerator == 0) {
        sign = true;
    }

    document.getElementById("numerator_r").value = Math.abs(numerator);
    document.getElementById("denominator_r").value = Math.abs(denominator);
    document.getElementById("sign_r").textContent = sign ? "" : " - ";

}

/**
 * setSign
 *
 * Устанавливает знак в поле отображающее его.
 *
 * @param {boolean} sign - true - "+", false - "-".
 */
function setSign(sign) {
    if (sign) {
        document.getElementById("sign").textContent = "+";
    } else {
        document.getElementById("sign").textContent = "-";
    }
}

/**
 * function getValue
 *
 * Возвращает значение поля value объекта с id.
 *
 * @param {string} id - id объекта
 * @returns {string|Number|string|*} - value.
 */
function getValue(id) {
    return document.getElementById(id).value;
}

/**
 * function getSign
 *
 * Возвращает знак из поля.
 *
 * @returns {boolean} true - "+", false - "-".
 */
function getSign() {
    var sign = document.getElementById("sign").textContent;
    return sign === "+" ? true : false
}


