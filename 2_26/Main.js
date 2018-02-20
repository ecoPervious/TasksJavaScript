function Main() {


    log("Hello world!")
    log("+1+2+5*3+5/7+(2*3)+5/8+5+8");
    log("+1+2+5*3+5/7+(2*3)+5/8+5+8".length);
    log("+1+2+5*3+5/7+(2*3)+5/8+5+8".charAt(25));
    log(getPostfixForm("+1+2+5*3+5/7+(2*3)+5/8+5+8"));


}

function getSemiPostfixCode(char) {

    switch (char) {
        case "1":
            return "q";
        case "2":
            return "w";
        case "3":
            return "e";
        case "4":
            return "r";
        case "5":
            return "t";
        case "6":
            return "y";
        case "7":
            return "u";
        case "8":
            return "i";
        case "9":
            return "o";
        case "0":
            return "p";
        case "+":
            return "a";
        case "-":
            return "s";
        case "*":
            return "d";
        case "/":
            return "f";
    }

}

function getSimvol(postfixCode) {

    switch (postfixCode) {
        case "q":
            return "1";
        case "w":
            return "2";
        case "e":
            return "3";
        case "r":
            return "4";
        case "t":
            return "5";
        case "y":
            return "6";
        case "u":
            return "7";
        case "i":
            return "8";
        case "o":
            return "9";
        case "p":
            return "0";
        case "a":
            return "+";
        case "s":
            return "-";
        case "d":
            return "*";
        case "f":
            return "/";
    }

    return "m";
}

function isSign(str) {
    return (str === "+" || str === "-" || str === "*" || str === "/");
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

function getPostfixForm(str) {

    log("Уничтожение сложных моментов в начале выражени");
    // Уничтожение сложных моментов в начале выражени
    log(str);
    if (str.charAt(0) === "-") str = "0" + str;
    if (str.charAt(0) === "+") str = str.substring(1);
    log(str);
    log("Раскрытие скобок");
    // Раскрытие скобок
    log(str);
    var i = 0;

    var count = 0;
    var begin = -1;
    var end = -1;

    while (i < str.length) {

        if (isParenthesisOpen(str.charAt(i))) {

            count++;

            if (begin === -1) {
                begin = i;
            }

        }

        if (isParenthesisClose(str.charAt(i))) {

            count--;

            if (count === 0) {
                end = i;
                var str_postfix_form = getPostfixForm(str.substring(begin + 1, end));
                str = str.substring(0, begin) + str_postfix_form + str.substring(end + 1);
                i -= (((end - begin) - str_postfix_form.length) + 1);

                end = -1;
                begin = -1;

                continue;
            }

        }

        i++;
        log(str);
    }

    log(str);
    log("Умножение и деление");

    //Умножение и деление

    i = 0;
    var flag = false;
    begin = 0;
    end = -1;
    var sign = -1;
    var sign_ = -1;

    log("X^" + str);
    while (i <= str.length) {

        if (i === str.length || isMathSign(str.charAt(i))) {

            if (begin === -1) {
                begin = i + 1;
            } else if (sign === -1) {
                sign = i;
            } else if (end === -1) {
                end = i;
            } else if (!flag) {
                begin = sign + 1;
                sign = end;
                end = i;
            }

            if(flag){

                if (!(sign === sign_)) {

                    begin = sign + 1;
                    sign = end;
                    end = i;

                }

                var postfix = getSemiPostfixFormSmall(str.substring(begin, sign),
                    str.substring(sign + 1, end),
                    str.substring(sign, sign + 1));

                str = str.substring(0, begin) + postfix + str.substring(end);
                log("Уничтожение умножения и деления: " + str);
                flag = false;
                begin = i + 1;
                sign = -1;
                end = -1;
                sign_ = -1;
            }

            if (isMathSignOne(str.charAt(i))) {
                flag = true;
                sign_ = i;
            }


        }
        i++;

    }
    log("X^" + str);
    i = 0;
    flag = false;
    begin = 0;
    end = -1;
    sign = -1;
    sign_ = -1;

    while (i <= str.length) {

        if (i === str.length || isMathSign(str.charAt(i))) {

            if (begin === -1) {
                begin = i + 1;
            } else if (sign === -1) {
                sign = i;
            } else if (end === -1) {
                end = i;
            } else if (!flag) {
                begin = sign + 1;
                sign = end;
                end = i;
            }

            if(flag){

                if (!(sign === sign_)) {

                    begin = sign + 1;
                    sign = end;
                    end = i;

                }

                var postfix = getSemiPostfixFormSmall(str.substring(begin, sign),
                    str.substring(sign + 1, end),
                    str.substring(sign, sign + 1));

                str = str.substring(0, begin) + postfix + str.substring(end);
                log("Уничтожение умножения и деления: " + str);
                flag = false;
                begin = i + 1;
                sign = -1;
                end = -1;
                sign_ = -1;
            }

            if (isMathSignTwo(str.charAt(i))) {
                flag = true;
                sign_ = i;
            }


        }
        i++;

    }

    return str;

}

function getSemiPostfixFormSmall(arg1, arg2, operation) {

    return getSemiPostfixForm(arg1) + getSemiPostfixForm(arg2) + getSemiPostfixForm(operation);
}

function getSemiPostfixForm(str) {

    var result = "";

    for (var i = 0; i < str.length; i++) {
        result += getSemiPostfixCode(str.charAt(i));
    }

    return result;

}


/**
 * function isParentheses
 *
 * Функция проверяет наличие в строке(выражение математическом) скобок, а так же правильность их расстановки.
 *
 * @param str - математическое выражение
 * @returns {number} - количество скобок, ( и ) - считается как за две скобки. В случае не правильной расстановки -1.
 */
function isParentheses(str) {

    var count = 0;
    var is = 0;

    for (var i = 1; i <= str.length; i++) {

        if (isParenthesisOpen(str.charAt(i))) {
            is++;
            count++;
        } else if (isParenthesisClose(str.charAt(i))) {
            is--;
            count++;
        }
        if (is < 0) {
            return -1;
        }

    }

    return count;
}

function isParenthesis(str) {
    return isParenthesisClose(str) || isParenthesisOpen(str);
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

function log(str) {
    document.getElementById("console").innerHTML += str + "<br/>";
}