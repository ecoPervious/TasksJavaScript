function getPostfixForm(str) {
    var s = getTransitionalForm(str);
    //alert("PF: " + s);
    return getPostfixFormToTransitional(s);
}

function getTransitionalSymbol(normalSymbol) {

    switch (normalSymbol) {
        case "1":
            return "Q";
        case "2":
            return "W";
        case "3":
            return "E";
        case "4":
            return "R";
        case "5":
            return "T";
        case "6":
            return "Y";
        case "7":
            return "U";
        case "8":
            return "I";
        case "9":
            return "O";
        case "0":
            return "P";
        case "+":
            return "A";
        case "-":
            return "S";
        case "*":
            return "D";
        case "/":
            return "F";
    }

    return normalSymbol;

}

function getTransitionalString(arg1, arg2, operation) {

    return getTransitionalSymbols(arg1) + getTransitionalSymbols(arg2) + getTransitionalSymbols(operation);
}

function getTransitionalSymbols(str) {

    var result = "";

    for (var i = 0; i < str.length; i++) {
        result += getTransitionalSymbol(str.charAt(i));
    }

    return result;

}

function getTransitionalForm(str) {

    /*
        Преобразуем математическое выражение к виду, когда оно однозначно будет начинаться с числа.
     */
    if (str.charAt(0) === "-") str = "0" + str;
    if (str.charAt(0) === "+") str = str.substring(1);

    /*
        В цикле находим первую открывающую скобку, а далее ищем для неё пару в виде закрывающей скобки.
        Если скобки существую и найдена пара для них, то выражение между ними рекурсивно отправляется в
        эту же функцию, а результат устанавливается на место "вырезанной" строки.

        i - индекс элемента(символа строки);
        count - количество найденных открытых, но не закрытых скобок;
        i_open - индекс первой найденной открытой скобки;
        i_close - индекс найденой парной закрывающей скобки;
     */
    for (var i = 0, count = 0, i_open = -1, i_close = -1; i <= str.length; i++) {

        /*
        Если нашли открывающую скобку, то в случае, если она первая - сохраняем её индекс, а так же увеличиваем
        значение количества открытых скобок.
         */
        if (isParenthesisOpen(str.charAt(i))) {
            count++;

            if (i_open === -1) {
                i_open = i;
            }
        }

        /*
        Если нашли закрывающуюся скобку, то уменьшаем количество открытых скобок. В случае если количество открытых
        и закрытых скобок равно нулю, то мы можем однозначно судить о том, что скобки открывались и закрылись, т.к.
        count != -1, а раз все скобки были закрыты, то значит мы нашли необходимую закрывающую скобку, берем строку
        от первой открывающейся скобки и до соответствующей закрывающейся и передаем рекурсивно в эту же функцию.
        Результат помещаем на место тех символов, которые мы словно "вырезали".
         */
        if (isParenthesisClose(str.charAt(i))) {
            count--;

            if (count === 0) {
                i_close = i;

                var str_postfix_form = getTransitionalForm(str.substring(i_open + 1, i_close));
                str = str.substring(0, i_open) + str_postfix_form + str.substring(i_close + 1);
                i -= ((i_close - i_open) - str_postfix_form.length);
                i_close = -1;
                i_open = -1;

                continue;
            }
        }

    }

    /*
    В цикле находим знаки умножения и деления, преобразуем аргумент стоящий до знака, аргумент стоящий после знака,
    и сам знак в "переходную" постфиксную форму, то есть это уже постфиксная форма и что бы в дальнейшем отличить
    преобразованную часть выражения от не преобразованной мы записываем цифры и знаки специальными буквенными символами.

    i - индекс элемента(символа строки);
    flag - флаг нахождения символа умножения или деления;
    begin_arg_1 - индекс элемента стоящего после предыдущего знака;
    end_arg_2 - индекс следующего знака;
    mid_sign - индекс знака, стоящего между begin_arg_1 и end_arg_2;
    sign - индекс найденного знака умножения или деления;

    Более подробно о переменных и для чего они служат:

    В цикле мы иттерируемся по символам строки и в каждый момент времени мы стремимся к тому, что бы хранить индексы,
    по которым мы можем определить три предыдущих знака, за это отвечают три переменные begin_arg_1, mid_sign,
    end_arg_2, здесь я осознано допускаю маленькую логическую ошибку в описание, т.к. в силу того, что
    в начале строки у нас нет знака и изначально предполагалось избегание и уничтожение знаков в начале математического
    выражения, begin_arg_1 хранит в себе индекс символа после первого математического знака.

    В случае если мы нашли математический знак "первого порядка" (допускю такое определение, в силу того, что
    выполняются эти знаки первыми), мы записываем его индекс в sign, а так же ставим flag = true, как только
    sign = mid_sign, мы начинаем преобразовывать найденную часть выражения в полупостфиксную форму. После чего идем
    дальше.
     */
    for (var i = 0, flag = false, begin_arg_1 = 0, end_arg_2 = -1, mid_sign = -1, sign = -1; i <= str.length; i++) {

        if (i === str.length || isMathSign(str.charAt(i))) {

            if (begin_arg_1 === -1) {
                begin_arg_1 = i + 1;
            } else if (mid_sign === -1) {
                mid_sign = i;
            } else if (end_arg_2 === -1) {
                end_arg_2 = i;
            } else if (!flag) {
                begin_arg_1 = mid_sign + 1;
                mid_sign = end_arg_2;
                end_arg_2 = i;
            }

            if (flag) {

                if (!(mid_sign === sign)) {
                    begin_arg_1 = mid_sign + 1;
                    mid_sign = end_arg_2;
                    end_arg_2 = i;
                }

                var postfix = getTransitionalString(str.substring(begin_arg_1, mid_sign),
                    str.substring(mid_sign + 1, end_arg_2),
                    str.substring(mid_sign, mid_sign + 1));

                str = str.substring(0, begin_arg_1) + postfix + str.substring(end_arg_2);

                flag = false;
                if (!isMathSignOne(str.charAt(i))) {
                    begin_arg_1 = i + 1;
                    mid_sign = -1;
                    end_arg_2 = -1;
                } else {
                    mid_sign = i;
                    sign = i;
                    end_arg_2 = -1;
                }

            }

            if (isMathSignOne(str.charAt(i))) {
                flag = true;
                sign = i;
            }
        }

    }


    /*
    В цикле находим знаки сложения и вычитания, по своей стркутуре цикл является абсолютно тем же процессом, что
    и в предыдущем цикле, при умножение и деление.
     */
    for (var i = 0, flag = false, begin_arg_1 = 0, end_arg_2 = -1, mid_sign = -1, sign = -1; i <= str.length; i++) {

        if (i === str.length || isMathSign(str.charAt(i))) {

            if (begin_arg_1 === -1) {
                begin_arg_1 = i + 1;
            } else if (mid_sign === -1) {
                mid_sign = i;
            } else if (end_arg_2 === -1) {
                end_arg_2 = i;
            } else if (!flag) {
                begin_arg_1 = mid_sign + 1;
                mid_sign = end_arg_2;
                end_arg_2 = i;
            }

            if (flag) {

                if (!(mid_sign === sign)) {

                    begin_arg_1 = mid_sign + 1;
                    mid_sign = end_arg_2;
                    end_arg_2 = i;

                }

                var postfix = getTransitionalString(str.substring(begin_arg_1, mid_sign),
                    str.substring(mid_sign + 1, end_arg_2),
                    str.substring(mid_sign, mid_sign + 1));

                str = str.substring(0, begin_arg_1) + postfix + str.substring(end_arg_2);
                flag = false;

                if (isMathSignTwo(str.charAt(i))) {
                    mid_sign = i;
                    sign = i;
                } else {
                    begin_arg_1 = i + 1;
                    mid_sign = -1;
                }
                end_arg_2 = -1;
            }

            if (isMathSignTwo(str.charAt(i))) {
                flag = true;
                sign = i;
            }
        }

    }

    return str;

}

function getNormalSymbol(transitionalSymbol) {

    switch (transitionalSymbol) {
        case "Q":
            return "1";
        case "W":
            return "2";
        case "E":
            return "3";
        case "R":
            return "4";
        case "T":
            return "5";
        case "Y":
            return "6";
        case "U":
            return "7";
        case "I":
            return "8";
        case "O":
            return "9";
        case "P":
            return "0";
        case "A":
            return "+";
        case "S":
            return "-";
        case "D":
            return "*";
        case "F":
            return "/";
    }

    return transitionalSymbol;
}

function getPostfixFormToTransitional(str) {

    var result = "";

    for (var i = 0; i < str.length; i++) {
        result += getNormalSymbol(str.charAt(i));
    }

    return result;

}

/*
    Функции для проверки принадлежности символа к той или иной группе символов.
 */

function isParenthesis(symbol) {
    return isParenthesisClose(symbol) || isParenthesisOpen(symbol);
}

function isParenthesisClose(str) {
    return str === ")";
}

function isParenthesisOpen(str) {
    return str === "(";
}

function isMathSign(str) {
    return isMathSignOne(str) || isMathSignTwo(str);
}

function isMathSignOne(str) {
    return str === "*" || str === "/";
}

function isMathSignTwo(str) {
    return str === "+" || str === "-";
}

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

function println(str) {
    document.getElementById("console").innerHTML += str + "<br/>";
}

function isAllTrueSymbols(str) {
    for(var i = 0; i < str.length; i++){
        if (!isTrueSymbol(str.charAt(i))){
            alert(str.charAt(i));
            return false;
        }
    }
    return true;
}

function isTrueSymbol(symbol) {
    return isMathSign(symbol) || isParenthesis(symbol) || isNumeric(symbol);
}

function isNotSingleDigitNumbers(str) {

    var symbol = str.charAt(0);

    for (var i = 1; i < str.length; i++) {
        var char = str.charAt(i);
        if (isNumeric(symbol) && isNumeric(char)) {
            return true;
        }
        symbol = char;
    }
    return false;
}

function isRepeatMathSign(str) {

    var symbol = str.charAt(0);
    var count_critical_situations = 0;

    for (var i = 1; i < str.length; i++) {

        var char = str.charAt(i);

        if (symbol === "+" && char === "+") {
            count_critical_situations++;
            symbol = char;
            continue;
        } else if (symbol === "+" && char === "-") {
            count_critical_situations++;
            symbol = char;
            continue;
        } else if (symbol === "-" && char === "-") {
            count_critical_situations++;
            symbol = char;
            continue;
        } else if (symbol === "-" && char === "+") {
            count_critical_situations++;
            symbol = char;
            continue;
        } else if (symbol === "-" && char === "-") {
            count_critical_situations++;
            symbol = char;
            continue;
        } else if (symbol === "*" && char === "*") {
            count_critical_situations++;
            symbol = char;
            continue;
        } else if (symbol === "/" && char === "/") {
            count_critical_situations++;
            symbol = char;
            continue;
        } else if (isMathSign(symbol) && isMathSign(char)) {
            return -1;
        }

        symbol = char;

    }

    return count_critical_situations;
}

function isErrorParentheses(str){

    for(var i = 0, count = 0; i < str.length; i++){

        if (isParenthesisOpen(str.charAt(i))){
            count++;
        } else if(isParenthesisClose(str.charAt(i))){
            count--;
        }

        if (count < 0){
            return true;
        }

    }

    return false;
}

function removeRepeatAllMathSign(str) {

    while (isRepeatMathSign(str)){
        str = removeRepeatMathSign(str);
    }
    return str;
}

function removeRepeatMathSign(str) {

    var symbol = str.charAt(0);

    for (var i = 1; i < str.length; i++) {

        var char = str.charAt(i);

        if (symbol === "+" && char === "+") {
            str = str.substring(0, i) + str.substring(i + 1);
            i--;
            symbol = str.charAt(i);
            continue;
        } else if (symbol === "+" && char === "-") {
            str = str.substring(0, i - 1) + str.substring(i);
            i--;
            symbol = str.charAt(i);
            continue;
        } else if (symbol === "-" && char === "-") {
            str = str.substring(0, i) + str.substring(i + 1);
            i--;
            symbol = str.charAt(i);
            continue;
        } else if (symbol === "-" && char === "+") {
            str = str.substring(0, i) + str.substring(i + 1);
            i--;
            symbol = str.charAt(i);
            continue;
        } else if (symbol === "-" && char === "-") {
            str = str.substring(0, i) + str.substring(i + 1);
            i--;
            symbol = str.charAt(i);
            continue;
        } else if (symbol === "*" && char === "*") {
            str = str.substring(0, i) + str.substring(i + 1);
            i--;
            symbol = str.charAt(i);
            continue;
        } else if (symbol === "/" && char === "/") {
            str = str.substring(0, i) + str.substring(i + 1);
            i--;
            symbol = str.charAt(i);
            continue;
        }

        symbol = char;
    }

    return str;
}

/**
 * Недопустимые конструкции:
 *
 * 0. Любые символы кроме: 1 2 3 4 5 6 7 8 9 0 / * - + ( ).
 * 1. Числа более 10 или менее -10.
 * 2. Появторяющиеся математические знаки:
 *      а) Возможные преобразования:
 *          1) ++ => +
 *          2) +- => -
 *          3) -- => +
 *          4) -+ => -
 *          5) ** => *
 *          6) // => /
 *      б) Невозможные преобразования:
 *          1) Какие либо другие махинации с делением и умножением.
 *          2)
 *
 */
