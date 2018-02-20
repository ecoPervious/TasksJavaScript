/**
 * function Main
 *
 * Функция запускается при загрузке тела страницы. Взывает метод нахождения чисел,
 * присваивает полю с id="result" список найденных чисал.
 *
 */
function Main() {

    document.getElementById("result").textContent = getNumber();

}

/**
 * function getNumbers
 *
 * Функция иттерируется по числам от 100 до 999 включительно, находит сумму
 * факториалов от цифр содержащихся в их записи, сравнивает с самим числом, записывает в строку.
 *
 * @returns {string} - список необходимых чисел в виде строки
 */
function getNumber(){

    var string_numbers = "";

    for(var i = 100; i <= 2000; i++){

        var list_numeric = getListNumeric(i);

        var sum_fact = getFactorial(list_numeric[0]) + getFactorial(list_numeric[1]) + getFactorial(list_numeric[2]);

        if (sum_fact === i){
            string_numbers += ("\n" + i);
        }

    }

    return string_numbers
}

/**
 * function getListNumeric
 *
 * Возвращает массив цифр содержащихся в числе.
 * Например на входное число 145 будет выдан ответ в виде массива [1, 4, 5];
 *
 * @param number - число.
 * @returns {Array} - массив цифр.
 */
function getListNumeric(number){

    var list_numeric = [];

    for(var i = 0; number > 10; i++){
        list_numeric[i] = number % 10;
        number = (number - list_numeric[i]) / 10;
    }

    return list_numeric;

}

/**
 * function getFactorial
 *
 * @param number - число.
 * @returns {number} - факториал числа.
 */
function getFactorial(number) {

    var result = 1;

    for(var i = 2; i <= number; i++){
        result *= i;
    }

    return result

}