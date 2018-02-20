function upDateOutput() {

    //alert(1);
    var mathematical_expression = getInput();
    //alert(mathematical_expression + ":" + mathematical_expression.charAt(0));
    if (!isAllTrueSymbols(mathematical_expression)) {
        setOutput("Неразрешенные символы, ошибка ввода!");
        //alert(2);
    } else if (isNotSingleDigitNumbers(mathematical_expression)) {
        setOutput("Не одноразрядные числа!");
        //alert(3);
    } else if (isErrorParentheses(mathematical_expression)) {
        setOutput("Неправильная расстановка скобок!");
    } else {
        var i = isRepeatMathSign(mathematical_expression);
        if (i === -1) {
            setOutput("Повторяющиеся знаки или недопустимо расставленные!")
            //alert(4);
        } else if (i > 0) {
            mathematical_expression = removeRepeatAllMathSign(mathematical_expression);
            setOutput(getPostfixForm(mathematical_expression));
        } else {
            setOutput(getPostfixForm(mathematical_expression));
        }
    }

}

function getInput() {
    return document.getElementById("in").value;
}

function setOutput(str) {
    document.getElementById("out").value = str;
}
