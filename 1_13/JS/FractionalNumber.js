/**
 * construction FractionNumber
 *
 * Создает объект прототипа FractionNumber, который описывает дробь.
 *
 * @param myNumerator - числитель дроби.
 * @param myDenominator - знаменатель дроби.
 * @constructor
 */
var FractionalNumber = function (myNumerator, myDenominator) {

    this.numerator = myNumerator;
    this.denominator = myDenominator;

}

/**
 * function getSign
 *
 * Определяет знак дроби.
 *
 * @returns {boolean} true - положительная дробь, false - отрицательная.
 */
FractionalNumber.prototype.getSign = function () {
    return (this.numerator > 0 && this.denominator > 0) || (this.numerator < 0 && this.denominator < 0);
}

/**
 * function addFN
 *
 * Прибавляет к объекту вызвавшему функцию переданную в неё дробь.
 *
 * @param fractionNumber - дробь которую необходимо прибавить к объект.
 * @returns {FractionalNumber} - дробь.
 */
FractionalNumber.prototype.addFN = function (fractionNumber) {

    // Сокращаем обе дроби.
    fractionNumber.abbreviated();
    this.abbreviated();

    // Без особых оптимизаций для более легкого сокращения конечной дроби
    // умножаем числители на противоположные знаменатели.
    this.numerator *= fractionNumber.denominator;
    fractionNumber.numerator *= this.denominator;

    // Новый знаменатель теперь является произведением знаменателей двух чисел.
    this.denominator = this.denominator * fractionNumber.denominator * 1;

    // Новый числитель является суммой двух числителей.
    // О знаках не стоит беспокоится, т.к. предварительно дроби были сокращены,
    // а знак после сокращения хранится в числителе.
    this.numerator += fractionNumber.numerator;

    // Сокращаем конечный результат записанный в текущем объекте
    this.abbreviated();

    // Возращаем результат в виде текущего объекта, если это требуется.
    // В принципе это позволяет конструкции вида:
    // Объект.addFN(объект1).addFN(объект2).addFN(объект3)
    return this;

}

/**
 * function subFN
 *
 * Прибавляет к объекту вызвавшему функцию переданную в неё дробь, но предварительно умножив её на "-1".
 *
 * @param {FractionNumber} fractionNumber - дробь которую необходимо прибавить к объект.
 * @returns {FractionalNumber} - дробь.
 */
FractionalNumber.prototype.subFN = function (fractionNumber) {

    // Сокращаем дробь, не уверен в целесообразности данного сокращения,
    // но на всякий случай пусть будет.
    fractionNumber.abbreviated();

    // Умножаем числитель на -1, тем самым меня знак, благодаря сокращению
    // мы наверняка уверены в том, что знак однозначно поменялся.
    fractionNumber.numerator *= -1;

    // Используем сложение.
    this.addFN(fractionNumber);

}

/**
 * function abbreviated
 *
 * Сокращает дробь.
 */
FractionalNumber.prototype.abbreviated = function () {

    // Если числитель и знаменатель дроби равны, то сводит их сразу к 1/1.
    if (this.numerator === this.denominator) {
        this.numerator = 1;
        this.denominator = 1;
        return null;
    }

    // Сохраняет знак дроби в переменной.
    var sign = this.getSign();

    // Убирает знаки у числителя и знаменателя.
    this.numerator = Math.abs(this.numerator);
    this.denominator = Math.abs(this.denominator);

    // Находит наибольший общий делитель (НОД) знаменателя и числителя.
    var nod = this.getNODNumeratorAndDenominator();

    // Делит числитель и знаменатель на НОД.
    this.numerator /= nod;
    this.denominator /= nod;

    // Устанавливает знак у числителя.
    this.numerator = sign ? this.numerator : -this.numerator;

}

/**
 * function getNODNumeratorAndDenominator
 *
 * Вычисляет наибольший общий делитель числителя и знаменателя.
 *
 * @param a - число a.
 * @param b - число b.
 * @returns {int} - наибольший общий делитель чисел.
 */
FractionalNumber.prototype.getNODNumeratorAndDenominator = function () {
    var a = this.numerator;
    var b = this.denominator;
    while (a !== 0 && b !== 0) {
        if (a > b) {
            a = a % b;
        } else {
            b = b % a;
        }
    }

    return a + b;
}

/**
 * function toString
 *
 * Возвращает строковое представление дроби. Функция использовалась для тестов.
 * @returns {string} - "Числитель/Знаменатель" -
 */
FractionalNumber.prototype.toString = function () {
    return this.numerator + " / " + this.denominator;
}
