var FractionalNumber = function (myNumerator, myDenominator) {

    this.numerator = myNumerator;
    this.denominator = myDenominator;

}

FractionalNumber.prototype.getSign = function () {
    return (this.numerator > 0 && this.denominator > 0) || (this.numerator < 0 && this.denominator < 0);
}

FractionalNumber.prototype.addFN = function(fractionNumber){


}

FractionalNumber.prototype.abbreviated = function () {

    var modAbbrFr = getAbbreviatedFraction(this.numerator, this.denominator);
    this.numerator = modAbbrFr[2] ? modAbbrFr[0] : -modAbbrFr[0];
    this.denominator = modAbbrFr[1];

}


/*
    function getAbbreviatedFraction

    params:
        numerator - числитель дроби;
        denominator - знаменатель дроби;

    process:
        Сокращает дробь.

    return:
        [numerator, denominator, sign]

        numerator - числитель дроби;
        denominator - знаменатель дроби;
        sign - знак дроби; (true: >= 0, false: < 0);
 */
function getAbbreviatedFraction(numerator, denominator) {

    if (numerator === denominator) return [1, 1, true];

    var sign = getMathSignFraction(numerator, denominator);

    numerator = getModule(numerator);
    denominator = getModule(denominator);

    var nod = getNOD(numerator, denominator);

    numerator /= nod;
    denominator /= nod;

    return [numerator, denominator, sign];

}

/*
    function getNOD

    params:
        a - число a;
        b - число b;

    process:
        Находит наименьший общий делитель.

    return: Наименьший общий делитель.
 */
function getNOD(a, b) {

    while (a !== 0 && b !== 0) {
        if (a > b) {
            a = a % b;
        } else {
            b = b % a;
        }
    }

    return a + b;
}

function getMathSignFraction(numerator, denominator){

    return (numerator / denominator) >= 0;

}

function getModule(number) {
    return number < 0 ? -number : number;
}