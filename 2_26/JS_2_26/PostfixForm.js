/**
 * Основные понятия использующиеся в комментариях/документации:
 *
 * 1. Постфиксная форма (PostfixForm) - такая форма записи математического выражения, когда сначала записываются
 * операнды, а затем знак операции, например: (3+5)*8 = 35+8*.
 *
 * 2. Переходная форма (TransitionalForm) - переходная форма необходима, что бы в процессе преобразования строки
 * различить уже преобразованные символы и ещё не преобразованные, суть её заключается в переводе преобразованной
 * части строки в специальные буквенные символы, то есть замена каждой цифры и знака на определенную букву.
 *
 * 3. Математические символы/знаки первого порядка - это те математические знаки, операции которых выполняются первыми,
 * то есть умножение и деление. Скобки входят в отдельную группу.
 *
 * 4. Математические символы/знаки второго порядка - это те математические знаки, операции которых выполняются вторыми,
 * то есть сложение и вычитание. Скобки входят в отдельную группу.
 *
 *
 *
 */


/**------------------------------------------------------------------------------------------------------------------*/

/**
 * function getPostfixForm
 *
 * Функция преобразует входную строку (предполагается, что строка это корректное математическое выражение) в
 * "переходную форму". После чего из переходной формы переводит в постфиксную запись выражения. Возвращает результат.
 *
 * @param {string} str - математическое выражение
 */
function getPostfixForm(str) {
    var s = getTransitionalForm(str);
    //alert("PF: " + s);
    return getPostfixFormToTransitional(s);
}

/*
Функции преобразующие "переходную" ворму в постфиксную форму.
 */

/**
 * function getNormalSymbol
 *
 * Преобразует один переходный символ в нормальный/обычный символ.
 * В случае, если символ не обнаружен или переданна более длинная строка, возвращается переданная строка.
 *
 * @param transitionalSymbol - переходный символ.
 * @returns {string} - строка с единственным нормальным символом.
 */
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

/**
 * function getPostfixFormToTransitional
 *
 * Преобразует входную строку, предположительно записанную в переходной форме, в постфиксную запись, то есть
 * просто преобразует каждый символ с помощью функции getNormalSymbol().
 *
 * @param {string} transitionalString - строка в переходной форме.
 * @returns {string} - строка в постфиксной форме.
 */
function getPostfixFormToTransitional(transitionalString) {

    var result = "";

    for (var i = 0; i < transitionalString.length; i++) {
        result += getNormalSymbol(transitionalString.charAt(i));
    }

    return result;

}

/*
Функции преобразующие обычное математическое выражение в "переходную форму".
 */

/**
 * function getTransitionalSymbol
 *
 * Возвращает "переходный символ", соответствующий входному нормальному символу. В случае, если входной символ не
 * предусмотрен в математическом выражение или передан не один символ, а строка, то возвращается входная строка.
 *
 * @param {string} normalSymbol - нормальный символ.
 * @returns {string} - переходный символ.
 */
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

/**
 * function getTransitionalPostfixFormString
 *
 * Функция пытается преобразовать переданные ей аргументы и операцию в "переходную форму", после чего формирует
 * порядок записи как в постфиксной форме и возвращает строку. На выходе должна получится строка:
 * arg1 + arg2 + operation
 *
 * Важно то, что сами аргументы и операция может быть уже в переходной форме, особенно это важно для аргументов,
 * в процессе преобразования строки, может случиться так, что один из аргументов уже преобразован, но для нас это не
 * так важно, т.к. нам важнее, что бы относительно данной (входной) операции он стоял на нужном месте.
 *
 * @param {string} arg1 - запись первого аргумент в переходной или нормальной форме.
 * @param {string} arg2 - запись второго аргумента в переходной или нормальной форме.
 * @param {string} operation - запись операции в переходной или нормальной форме.
 * @returns {string}
 */
function getTransitionalPostfixFormString(arg1, arg2, operation) {

    return getTransitionalString(arg1) + getTransitionalString(arg2) + getTransitionalString(operation);
}

/**
 * function getTransitionalString
 *
 * Преобразует все символы строки в символы переходной формы.
 *
 * @param {string} str - строка записанная нормальными символами.
 * @returns {string} - строка записанная "переходными символами".
 */
function getTransitionalString(str) {

    var result = "";

    for (var i = 0; i < str.length; i++) {
        result += getTransitionalSymbol(str.charAt(i));
    }

    return result;

}

/**
 * function getTransitionalForm
 *
 * Функция преобразует обычную запись выражения в "переходную форму".
 *
 * О процессе перевода в "переходную форму":
 *
 * 1. Преобразует части выражения в скобках. Внимание! Преобразование происходит рекурсивно передавая выражение в
 * скобках в эту же функцию.
 * 2. Преобразует математические операции "первого порядка".
 * 3. Преобразует математические операции "второго порядка".
 *
 * @param {string} str - обычное математическое выражение.
 * @returns {string} - выражение в переходной форме.
 */
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

                var postfix = getTransitionalPostfixFormString(str.substring(begin_arg_1, mid_sign),
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

                var postfix = getTransitionalPostfixFormString(str.substring(begin_arg_1, mid_sign),
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

/*
    Функции для проверки принадлежности символа к той или иной группе символов.
 */

/**
 * function isParenthesis
 *
 * Проверяет, является ли переданный символ круглой скобкой "(" или ")".
 *
 * @param {string} symbol - символ.
 * @returns {boolean} - true, если является "(" или ")"; false, иначе.
 */
function isParenthesis(symbol) {
    return isParenthesisClose(symbol) || isParenthesisOpen(symbol);
}

/**
 * function isParenthesisClose
 *
 * Функция проверяет является ли символ закрывающей скобкой ")".
 *
 * @param {string} str - символ.
 * @returns {boolean} - true, если является ")"; false, иначе.
 */
function isParenthesisClose(str) {
    return str === ")";
}

/**
 * function isParenthesisOpen
 *
 * Функция проверяет является ли символ открывающей скобкой "(".
 *
 * @param {string} str - символ.
 * @returns {boolean} - true, если является "("; false, иначе.
 */
function isParenthesisOpen(str) {
    return str === "(";
}

/**
 * function isMathSign
 *
 * Функция проверяет является ли символ математическим знаком "+", "-", "*", "/".
 *
 * @param {string} str - символ.
 * @returns {boolean} - true, если является "+", "-", "*", "/"; false, иначе.
 */
function isMathSign(str) {
    return isMathSignOne(str) || isMathSignTwo(str);
}

/**
 * function isMathSignOne
 *
 * Функция проверяет является ли символ математическим знаком первого порядка "*", "/".
 *
 * @param {string} str - символ.
 * @returns {boolean} - true, если является "*", "/"; false, иначе.
 */
function isMathSignOne(str) {
    return str === "*" || str === "/";
}

/**
 * function isMathSignTwo
 *
 * Функция проверяет является ли символ математическим знаком второго порядка "+", "-".
 *
 * @param {string} str - символ.
 * @returns {boolean} - true, если является "+", "-"; false, иначе.
 */
function isMathSignTwo(str) {
    return str === "+" || str === "-";
}

/**
 * function isNumeric
 *
 * Функция проверяет является ли символ цифрой "1", "2", "3", "4", "5", "6", "7", "8", "9", "0".
 *
 * @param {string} str - символ.
 * @returns {boolean} - true, если является "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"; false, иначе.
 */
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

/**
 * function isTrueSymbol
 *
 * Функция проверяет является ли символ разрешенным:
 * "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/".
 *
 * @param {string} symbol - символ.
 * @returns {boolean} - true, если "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/"; false, иначе.
 */
function isTrueSymbol(symbol) {
    return isMathSign(symbol) || isParenthesis(symbol) || isNumeric(symbol);
}

/*
Функции для проверки строки на соответствие тех или иных правил.
 */

/**
 * function isTrueString
 *
 * Функция проверяет каждый символ с помощью функции isTrueSymbol. Возвращает false, если хотя бы раз isTrueSymbol
 * вернула false, иначе true.
 *
 * @param {string} str - входная строка с математическим выражением.
 * @returns {boolean} - true, если все символы разрешены; false, если встретился хотя бы один запрещенный.
 */
function isTrueString(str) {
    for(var i = 0; i < str.length; i++){
        if (!isTrueSymbol(str.charAt(i))){
            alert(str.charAt(i));
            return false;
        }
    }
    return true;
}

/**
 * function isNotSingleDigitNumbers
 *
 * Функция проверяет наличие неодноразрядных чисел.
 *
 * @param {string} str - математическое выражение.
 * @returns {boolean} - true, если имеются неодноразрядные числа; false, иначе.
 */
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

/**
 * function isRepeatMathSign
 *
 * Функция проверяет наличие повторяющихся математических знаков, есть три варианта работы данной функции:
 *
 * 1. Отсутствуют повторяющиеся знаки, возвращается 0.
 * 2. Присутствуют критические ситуации, которые можно преобразовать с помощью специальных функций:
 *      а) "++";
 *      б) "+-";
 *      в) "-+";
 *      г) "--";
 *      д) "**";
 *      е) "//";
 *    В таком случае возвращается количество критических ситуаций.
 * 3. Присутствуют случаи, когда рядом стоящих символов более одного и они не попадают под пункт 2. Возвращается -1.
 *
 * @param {string} str - математическое выражение.
 * @returns {number} - количество критических ситуаций, или -1, если это уже непреодолимые ситуации.
 */
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

/**
 * function isErrorParentheses
 *
 * Функция проверяет правильность расстановки скобок.
 *
 * @param {string} str - математическое выражение.
 * @returns {boolean} - true, если имеются ошибки; false, иначе.
 */
function isErrorParentheses(str){

    var count = 0;

    for(var i = 0; i < str.length; i++){

        if (isParenthesisOpen(str.charAt(i))){
            count++;
        } else if(isParenthesisClose(str.charAt(i))){
            count--;
        }

        if (count < 0){
            return true;
        }

    }

    if(count !== 0){
        return true;
    }

    return false;
}

/*
Функции для удаления повторяющихся математических знаков
 */

/**
 * function removeRepeatAllMathSign
 *
 * Функция устарела. Она запускала функцию removeRepeatMathSign до тех пор, пока не осталось бы критических случаев
 * повторения знаков.
 *
 * @param {string} str - математическое выражение
 * @returns {string} - исправленное математическое выражение.
 */
function removeRepeatAllMathSign(str) {

    while (isRepeatMathSign(str)){
        str = removeRepeatMathSign(str);
    }
    return str;
}

/**
 * function removeRepeatMathSign
 *
 * Функция удаляет ситуации с критическим повторением математических знаков.
 *
 * @param {string} str - математическое выражение.
 * @returns {string} - исправленное математическое выражение.
 */
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
